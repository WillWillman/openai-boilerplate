import { Lib } from './interfaces';

// getAt function must stay in the same file as log function
const getAt = () => {
  try {
    const callerLine = new Error()
      .stack
      .split('\n')
      .slice(1) // remove "Error" line
      .find(line => !line.includes(__filename));

    const functionParenPattern = /at\s+.*?\s+\(([^)]+):(\d+):(\d+)\)/;
    const directPattern = /at\s+([^:]+):(\d+):(\d+)/;

    const match = callerLine.match(functionParenPattern) || callerLine.match(directPattern);
    const filePath = match[1].split('/src/').slice(1).join('/src/');
    const line = match[2];

    return [filePath, line].join(':');
  } catch {
    return 'error getting location';
  }
};

const log = (level, config) => (message, logData) => (data) => {
  const shouldLog = config.levels.includes('*') || config.levels.includes(level);
  if (shouldLog) {
    console.dir({
      level,
      message,
      at: getAt(),
      data: logData
        ? data
        : `logData is set to ${logData}`,
    }, {
      depth: null,
      colors: true,
    });
  };

  return data;
};

export const logger: Lib = (config) => ({
  info: log('info', config),
  debug: log('debug', config),
  warn: log('warn', config),
  error: log('error', config),
  fatal: log('fatal', config),
});
