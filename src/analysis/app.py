from flask import Flask, jsonify, request

app = Flask(__name__)

# 인퍼런스 설정
from ratsnlp.nlpbook.classification import ClassificationDeployArguments
args = ClassificationDeployArguments(
    pretrained_model_name="beomi/kcbert-base",
    downstream_model_dir="./checkpoint",
    max_seq_length=128,
)

# 토크나이저 로드
from transformers import BertTokenizer
tokenizer = BertTokenizer.from_pretrained(
    args.pretrained_model_name,
    do_lower_case=False,
)

# 체크포인트 로드
import torch
fine_tuned_model_ckpt = torch.load(
    args.downstream_model_checkpoint_fpath,
    map_location=torch.device("cpu"),
)

# BERT 설정 로드
from transformers import BertConfig
pretrained_model_config = BertConfig.from_pretrained(
    args.pretrained_model_name,
    num_labels=fine_tuned_model_ckpt["state_dict"]["model.classifier.bias"].shape.numel(),
)

# BERT 모델 초기화
from transformers import BertForSequenceClassification
model = BertForSequenceClassification(pretrained_model_config)
app = Flask(__name__)

# 체크포인트 주입하기
model.load_state_dict({k.replace("model.", ""): v for k, v in fine_tuned_model_ckpt['state_dict'].items()})

# 평가 모드로 전환
model.eval()

@app.route('/analy', methods=['POST'])
def inference_fn():
  data = request.get_json(silent=True)
  sentence = data.get('sentence')
  inputs = tokenizer(
      [sentence],
      max_length=args.max_seq_length,
      padding="max_length",
      truncation=True,
  )
  with torch.no_grad():
    outputs = model(**{k: torch.tensor(v) for k, v in inputs.items()})
    prob = outputs.logits.softmax(dim=1)
    positive_prob = round(prob[0][1].item(), 4)
    negative_prob = round(prob[0][0].item(), 4)
    pred = "긍정 (positive)" if torch.argmax(prob) == 1 else "부정 (negative)"

  return jsonify({
      'sentence': sentence,
      'prediction': pred,
      'positive_data': f"긍정 {positive_prob}",
      'negative_data': f"부정 {negative_prob}",
  })

@app.route('/')
def home():
    return 'This is home!'

if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)