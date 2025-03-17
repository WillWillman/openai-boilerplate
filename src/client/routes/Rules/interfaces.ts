import { getActions } from 'Client-Store';

export type Props = ReturnType<typeof getActions> & {
  data: {
    resources: Record<string, Record<string, any>[]>;
    openai: {
      chatJSON: any[];
    }
  };
};
