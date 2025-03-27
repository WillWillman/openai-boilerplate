import { resources } from './resources';
import { safeParse } from './safeParse';

const {
  DATA_DB_NAME = 'data',
  DATA_OPTIONS = '{}',
  DATA_URI = 'mongodb://localhost:27017',
  LOGGER_LEVELS = '["*"]',
  NODE_ENV = 'development',
  OPENAI_API_KEY,
  OPENAI_API_OPTIONS = '{}',
  OPENAI_API_ORGANIZATION,
  PORT = 3000,
  RESOURCES = JSON.stringify(resources),
  ON_REQUEST_LOG_BODY = false,
  ON_REQUEST_LOG_HEADERS = false,
  ON_REQUEST_ENABLED = false,
  ON_RESPONSE_LOG_BODY = false,
  ON_RESPONSE_LOG_HEADERS = false,
  ON_RESPONSE_ENABLED = false,
} = process.env;

export const config = {
  server: {
    env: NODE_ENV,
    port: Number(PORT),
    onRequestLogger: {
      enabled: safeParse(ON_REQUEST_ENABLED),
      logBody: safeParse(ON_REQUEST_LOG_BODY),
      logHeaders: safeParse(ON_REQUEST_LOG_HEADERS),
    },
    onResponseLogger: {
      enabled: safeParse(ON_RESPONSE_ENABLED),
      logBody: safeParse(ON_RESPONSE_LOG_BODY),
      logHeaders: safeParse(ON_RESPONSE_LOG_HEADERS),
    },
  },
  logger: {
    levels: safeParse(LOGGER_LEVELS),
  },
  data: {
    uri: DATA_URI,
    dbName: DATA_DB_NAME,
    resources: safeParse(RESOURCES),
    options: safeParse(DATA_OPTIONS),
  },
  openAI: {
    apiKey: OPENAI_API_KEY,
    organization: OPENAI_API_ORGANIZATION,
    ...safeParse(OPENAI_API_OPTIONS),
  }
};
