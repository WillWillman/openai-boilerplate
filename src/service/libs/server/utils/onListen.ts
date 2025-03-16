export const onListen = (config) => () => {
  console.log(`Server is running on http://localhost:${config.port}`);
};
