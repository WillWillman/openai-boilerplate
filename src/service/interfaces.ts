import * as express from 'express';
import { ChatCompletion } from 'openai/resources';
import { config } from './config';
import * as libs from './libs';

/* eslint-disable no-unused-vars */
export type Config = typeof config;

export type MongoClientType = {
    close: () => Promise<void>;
    count: (query: Record<string, any>) => Promise<number>;
    create: (doc: Record<string, any>) => Promise<any>;
    read: (id: string) => any;
    list: (query: Record<string, any>) => Promise<any[]>;
    update: (doc: Record<string, any>) => Promise<any>;
    upsert: (doc: Record<string, any>) => Promise<any>;
    removeOne: (doc: Record<string, any>) => Promise<any>;
};

export type OpenAISchema = {
    promptSchema: Record<string, any>;
    responseSchema: Record<string, any>;
    assistantStatement: string;
};

export interface Libs {
    data: {
        collection: Record<string, MongoClientType>;
    };
    openAI: {
        chatJSON: (schema: OpenAISchema) => (data: any) => Promise<ChatCompletion>;
    };
    logger: (message: string, logData?: boolean, stringifyJSON?: boolean) => <T>(data: T) => T;
    server: typeof libs.server;
}

export interface Route {
    path: string;
    method: 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head';
    handler: express.RequestHandler;
}
