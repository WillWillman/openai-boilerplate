import { fetchJson } from '../../../utils';
import { createActionTypes } from '../types';

export const create = (resource: string) => {
  const actions = createActionTypes(resource);

  return (dispatch: any) => async (body: any) =>
    dispatch({
      type: actions.CREATE,
      payload: await fetchJson({
        url: `/api/resources/${resource}`,
        method: 'POST',
        body,
      }),
    });
};
