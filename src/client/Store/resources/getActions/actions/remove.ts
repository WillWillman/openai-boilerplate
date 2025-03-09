import { fetchJson } from '../../../utils';
import { createActionTypes } from '../types';

export const remove = (resource: string) => {
  const actions = createActionTypes(resource);

  return (dispatch) => async (id: string) =>
    dispatch({
      type: actions.REMOVE,
      payload: await fetchJson({
        url: `/api/resources/${resource}/${id}`,
        method: 'DELETE',
      }),
    });
};
