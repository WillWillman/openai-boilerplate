
export const traverse = (checker, worker) => <T>(obj: T): T => {
  const recursively = (value) => {
    if (checker(value)) {
      return worker(value);
    }

    if (Array.isArray(value)) {
      return value.map(recursively);
    }

    if (typeof value === 'object' && value !== null) {
      return Object
        .entries(value)
        .reduce((acc, [k, v]) => ({
          ...acc,
          [k]: recursively(v),
        }), {}) as T;
    }

    return value
  }
  return recursively(obj);
};
