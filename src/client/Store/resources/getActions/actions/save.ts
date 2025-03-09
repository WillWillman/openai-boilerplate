import { fetchJson } from '../../../utils';
import { createActionTypes } from '../types';

export const save = (resource: string) => {
  const actions = createActionTypes(resource);

  return (dispatch) => async (bodies: any[]) =>
    bodies.map(async (body) =>
      dispatch({
        type: actions.SAVE,
        payload: await fetchJson({
          url: `/api/resources/${resource}`,
          method: 'PUT',
          body,
        }),
      }),
    );
};
