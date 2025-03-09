import { Lib } from './interfaces';
import { getDataToLog } from './utils';

export const logger: Lib = (config) => (message, { shouldLogData, shouldStringifyJsonData, level } = {}) => (data) => {
  const shouldLog = config.levels.includes('*') || config.levels.includes(level);
  if (shouldLog) {
    const dataToLog = getDataToLog(shouldLogData, shouldStringifyJsonData, data);
    console.log(message, dataToLog);
  };

  return data;
};
