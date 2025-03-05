import OpenAI from 'openai';
import { jsonrepair } from 'jsonrepair';
import { OpenAISchema } from '../../interfaces';

export const chatJSON = (openAI: OpenAI, defaultModel) => (schema: OpenAISchema) => async (prompt: Record<string, any>, model?: string) =>
  openAI
    .chat
    .completions
    .create({
      model: defaultModel || model,
      messages: [
        {
          role: 'developer',
          content: [
            {
              type: 'text',
              text: `You are an assistant: ${schema.assistantStatement}`,
            }
          ],
        },
        {
          role: 'developer',
          content: [
            {
              type: 'text',
              text: `Prompt Schema: ${JSON.stringify(schema.promptSchema)}`,
            }
          ],
        },
        {
          role: 'developer',
          content: [
            {
              type: 'text',
              text: `Response Schema: ${JSON.stringify(schema.responseSchema)}`,
            }
          ],
        },
        {
          role: 'developer',
          content: 'Only respond with structured stringified compact JSON. no whitespace, no newlines, nothing other than the json.',
        },
        {
          role: 'user',
          content: JSON.stringify(prompt),
        },
      ],
    })
    .then(response => response?.choices?.[0]?.message?.content)
    .then(response => response || '{}')
    .then(jsonrepair)
    .then(JSON.parse);
