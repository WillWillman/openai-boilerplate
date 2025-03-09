import { fetchJson } from '../../../utils';
import { createActionTypes } from '../types';

export const read = (resource: string) => {
  const actions = createActionTypes(resource);

  return (dispatch: any) => async (id: string) =>
    dispatch({
      type: actions.READ,
      payload: await fetchJson({
        url: `/api/resources/${resource}/${id}`,
        method: 'GET',
      }),
    });
};
