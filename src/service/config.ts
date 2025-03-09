import { config as Config } from '../config';

export const config = {
  server: {
    env: process.env.NODE_ENV || 'development',
    port: Number(process.env.PORT || 3000)
  },
  logger: {
    levels: JSON.parse(process.env.LOGGER_LEVELS || '["*"]')
  },
  data: {
    uri: process.env.DATA_URI,
    db: process.env.DATA_DB,
    resources: Config.resources,
    options: JSON.parse(process.env.DATA_OPTIONS || '{}')
  },
  openAI: {
    apiKey: process.env.OPENAI_API_KEY,
    organization: process.env.OPENAI_API_ORGANIZATION,
    ...JSON.parse(process.env.OPENAI_OPTIONS || '{}')
  },
};
