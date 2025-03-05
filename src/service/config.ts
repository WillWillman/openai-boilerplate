export const config = {
  port:  Number(process.env.PORT || 3000),
  data: {
    uri: process.env.DATA_URI,
    db: process.env.DATA_DB,
    resources: JSON.parse(process.env.DATA_RESOURCES || '[]'),
    options: JSON.parse(process.env.DATA_OPTIONS || '{}')
  },
  openAI: {
    defaultModel: process.env.OPENAI_DEFAULT_MODEL || 'gpt-4o',
    options: {
      apiKey: process.env.OPENAI_API_KEY,
      organization: process.env.OPENAI_API_ORGANIZATION,
      ...JSON.parse(process.env.OPENAI_OPTIONS || '{}')
    },
  },
};
