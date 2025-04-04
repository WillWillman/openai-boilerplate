export type LogLevels = 'debug' | 'info' | 'warn' | 'error' | 'fatal' | 'none' | '*';

type Logger = (message: string, withData?: boolean | Function) => <T>(data: T) => T;

export type Client = {
  debug: Logger,
  info: Logger,
  warn: Logger,
  error: Logger,
  fatal: Logger,
};

export type Config = {
  levels: LogLevels[];
};

export type Lib = (config: Config) => Client;
