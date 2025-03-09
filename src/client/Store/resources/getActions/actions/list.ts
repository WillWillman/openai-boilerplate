import { fetchJson } from '../../../utils';
import { createActionTypes } from '../types';

export const list = (resource: string) => {
  const actions = createActionTypes(resource);

  return (dispatch: any) => async (query: any) =>
    dispatch({
      type: actions.LIST,
      payload: await fetchJson({
        url: `/api/resources/${resource}`,
        query,
        method: 'GET',
      }),
    });
};
