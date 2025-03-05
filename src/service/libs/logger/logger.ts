const logLevels = ['debug', 'info', 'log', 'warn', 'error', 'none'];
const logLevel = process.env.LOG_LEVEL || 'log';
const shouldLog = (level) => logLevels.indexOf(level) >= logLevels.indexOf(logLevel);

const _console = console;
global.console = {
  ...global.console,
  ...logLevels.reduce((acc, level) => {
    acc[level] = (message?: any, ...optionalParams: any[]) => {
      shouldLog(level) && _console[level](message, ...optionalParams);
    };
    return acc;
  }, {}),
};

export const logger = (message, logData?, stringifyJSON?) => (data) => {
  if (logData) {
    console.log(
      message,
      stringifyJSON
        ? JSON.stringify(data, null, 2)
        : data,
    );
  } else {
    console.log(message);
  }
  return data;
};
