export type LogLevels = 'debug' | 'info' | 'log' | 'warn' | 'error' | 'none' | '*';

export type Opts = {
  shouldLogData?: boolean,
  shouldStringifyJsonData?: boolean,
  level?: LogLevels
};

export type Config = {
  levels: LogLevels[];
};

export type Client = (message: string, opts?: Opts) => (data: any) => any;
export type Lib = (config: Config) => Client;
