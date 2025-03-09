import { fetchJson } from '../../../utils';
import { Actions } from '../types';

export const modelsList = (dispatch: any) => async () => {
  dispatch({
    type: Actions.MODELS_LIST,
    payload: await fetchJson({
      url: '/api/openai/models',
      method: 'get',
    }),
  });
};
