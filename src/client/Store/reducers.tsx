const filterAndMakeIdObj = (init, array, filter) =>
  array
    .filter(filter)
    .reduce((acc, obj) => ({
      ...acc,
      [obj.id]: obj,
    }), init);

const update = (state, action) => {
  const updatedObj = {
    ...state.asObj,
    [action.payload.id]: action.payload,
  };

  return {
    asObj: updatedObj,
    asArray: Object.values(updatedObj),
  };
};

export const getResourceReducers = (resource) => (
  state = { asObj: {}, asArray: [], dirty: [] },
  action
) => {
  switch (action.type) {
    case `CREATE_${resource}`:
    case `READ_${resource}`:
    case `UPDATE_${resource}`: {
      return {
        dirty: [...state.dirty, action.payload.id],
        ...update(state, action),
      };
    }
    case `SAVE_${resource}`: {
      return {
        dirty: [],
        ...update(state, action),
      };
    }
    case `LIST_${resource}`: {
      const filterFn = item => !state.dirty.includes(item.id)
      return {
        dirty: state.dirty,
        asObj: filterAndMakeIdObj(state.asObj, action.payload, filterFn),
        asArray: action.payload,
      };
    }
    case `REMOVE_${resource}`: {
      const filterFn = item => item.id !== action.payload.id
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