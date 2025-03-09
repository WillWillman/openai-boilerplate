export const safeParse = (value: any) => {
  try {
    return JSON.parse(value);
  } catch (_e) {
    return value;
  }
};
