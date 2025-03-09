import { createActionTypes } from '../types';

export const update = (resource: string) => {
  const actions = createActionTypes(resource);

  return (dispatch) => (payload: any) =>
    dispatch({
      type: actions.UPDATE,
      payload,
    });
};
