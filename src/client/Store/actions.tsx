import queryString from 'query-string';

enum Methods {
  CREATE = 'POST',
  READ = 'GET',
  UPDATE = 'PUT',
  REMOVE = 'DELETE',
  LIST = 'GET',
}

const actions = (resource) => ({
  CREATE: `CREATE_${resource}`,
  READ: `READ_${resource}`,
  UPDATE: `UPDATE_${resource}`,
  REMOVE: `REMOVE_${resource}`,
  LIST: `LIST_${resource}`,
  SAVE: `SAVE_${resource}`,
});

const endpoints = (resource) => ({
  CREATE: `/${resource}`,
  READ: `/${resource}/:id`,
  UPDATE: `/${resource}/:id`,
  REMOVE: `/${resource}/:id`,
  LIST: (query) => `/${resource}?${queryString.stringify(query)}`,
});


const fetchAndDispatch = (dispatch, type) => async (url: string, options: RequestInit = {}) => {
  const response = await fetch('/api' + url, {
    ...options,
    headers: {
      ...options.headers || {},
      'Content-Type': 'application/json',
    },
  });
  const payload = await response.json();
  dispatch({ type, payload });
}

export const getResourceActions = (resource) => ({
  create: (payload: Record<string, any>) => async (dispatch: any) =>
    fetchAndDispatch(dispatch, actions(resource).CREATE)(endpoints(resource).CREATE, {
      method: Methods.CREATE,
      body: JSON.stringify(payload),
    }),
  read: (id: string) => async (dispatch: any) =>
    fetchAndDispatch(dispatch, actions(resource).READ)(endpoints(resource).READ, {
      method: Methods.READ
    }),
  update: (payload: Record<string, any>) => async (dispatch: any) =>
    dispatch({
      type: actions(resource).UPDATE,
      payload
    }),
  remove: (id: string) => async (dispatch: any) =>
    fetchAndDispatch(dispatch, actions(resource).REMOVE)(endpoints(resource).REMOVE, {
      method: Methods.REMOVE
    }),
  list: (query) => async (dispatch: any) =>
    fetchAndDispatch(dispatch, actions(resource).LIST)(endpoints(resource).LIST(query), {
      method: Methods.LIST
    }),
  save: (payloads: Record<string, any>) => async (dispatch: any) =>
    payloads.map((payload) => fetchAndDispatch(dispatch, actions(resource).SAVE)(endpoints(resource).UPDATE, {
      method: Methods.UPDATE,
      body: JSON.stringify(payload),
    })),
});
