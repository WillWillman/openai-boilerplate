export const filterAndMakeIdObj = (init, array, filter) =>
  array
    .filter(filter)
    .reduce((acc, obj) => ({
      ...acc,
      [obj.id]: obj,
    }), init);
