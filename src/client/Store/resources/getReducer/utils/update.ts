export const update = (state, action) => {
  const updatedObj = {
    ...state.asObj,
    [action.payload.id]: action.payload,
  };

  return {
    asObj: updatedObj,
    asArray: Object.values(updatedObj),
  };
};
