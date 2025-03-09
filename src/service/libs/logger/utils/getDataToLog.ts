export const getDataToLog = (shouldLogData, shouldStringifyJsonData, data) => {
  if (shouldLogData && shouldStringifyJsonData) {
    return JSON.stringify(data, null, 2);
  };
  if (shouldLogData) {
    return data;
  }
  return '[Data not logged]';
};
