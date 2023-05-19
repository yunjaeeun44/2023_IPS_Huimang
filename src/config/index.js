import dotenv from "dotenv";

// Set the NODE_ENV to 'development' by default
// process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();

if (envFound.error) {
    // This error should crash whole process
    throw new Error(envFound.error);
}

const {
    PORT,
    OPENAI_API_KEY,
    MONGO_URI,
    JWT_SECRET_KEY,
    PHONE_NUMBER,
    SENS_SERVICE_ID,
    SENS_ACCESS_KEY,
    SENS_SECRET_KEY,
} = process.env;

export default {
    port: PORT,
    openai_api_key: OPENAI_API_KEY,
    mongoURI: MONGO_URI,
    jwtSecret: JWT_SECRET_KEY,
    phoneNumber: PHONE_NUMBER,
    serviceId: SENS_SERVICE_ID,
    accessKey: SENS_ACCESS_KEY,
    secretKey: SENS_SECRET_KEY,
};