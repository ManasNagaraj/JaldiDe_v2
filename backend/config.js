import dotenv from 'dotenv';

dotenv.config();

export default {
  MONGODB_URL:
    'mongodb+srv://manas123:manas123@firstproject-2kv0i.mongodb.net/JaldiDe?retryWrites=true&w=majority',
  JWT_SECRET: process.env.JWT_SECRET || 'secretkey',
  accessKeyId: process.env.accessKeyId || 'accessKeyId',
  secretAccessKey: process.env.secretAccessKey || 'secretAccessKey',
};
