import { createActionTypes } from '../getActions';
import {
  filterAndMakeIdObj,
  update,
} from './utils';

export const getReducer = (resource) => {

  const actions = createActionTypes(resource);

  return (
    state = { asObj: {}, asArray: [], dirty: [] },
    action,
  ) => {
    switch (action.type) {
    case actions.CREATE:
    case actions.READ:
    case actions.UPDATE: {
      return {
        dirty: [...state.dirty, action.payload.id],
        ...update(state, action),
      };
    }

    case actions.SAVE: {
      return {
        dirty: [],
        ...update(state, action),
      };
    }

    case actions.LIST: {
      const filterFn = item => !state.dirty.includes(item.id);
      return {
        dirty: state.dirty,
        asObj: filterAndMakeIdObj(state.asObj, action.payload, filterFn),
        asArray: action.payload,
      };
    }

    case actions.REMOVE: {
      const filterFn = item => item.id !== action.payload.id;
      return {
        dirty: state.dirty.filter(filterFn),
        asObj: filterAndMakeIdObj({}, state.asArray, filterFn),
        asArray: state.asArray.filter(filterFn),
      };
    }

    default:
      return state;
    }
  };
};
