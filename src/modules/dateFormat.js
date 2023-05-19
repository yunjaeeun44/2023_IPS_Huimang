const dateFormat = () => {
    var date = new Date();
    var year = date.getFullYear();
    var month = ("0" + (1 + date.getMonth())).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);

    return year + month + day;
}

const yesterdayFormat = () => {
    const loadDt = new Date();
    const date = new Date(Date.parse(loadDt) - 1 * 1000 * 60 * 60 * 24); //하루전

    var year = date.getFullYear();
    var month = ("0" + (1 + date.getMonth())).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);
    return year + month + day;
}

export {
    dateFormat, 
    yesterdayFormat,
};