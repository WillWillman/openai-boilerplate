import { resources } from './resources';

export const config = {
  resources: process.env.RESOURCES
      ? JSON.parse(process.env.RESOURCES)
      : resources
};
