import { fetchJson } from '../../../utils';
import { Actions, ChatCompletionPayload } from '../types';

export const chatCompletion = (dispatch: any) => async (body: ChatCompletionPayload) => {
  dispatch({
    type: Actions.CHAT_COMPLETION,
    payload: await fetchJson({
      url: '/api/openai/chat/completions',
      method: 'post',
      body,
      headers: {
        'Content-Type': 'application/json',
      },
    }),
  });
};
