import { traverse } from './traverse';

// Define a type that transforms action types by removing the dispatch parameter
type DispatchApplied<T> = T extends (dispatch: any) => infer R ? R : T;

// Apply this transformation recursively to all properties
type ApplyDispatchToAll<T> = {
  [K in keyof T]: T[K] extends Function
    ? DispatchApplied<T[K]>
    : T[K] extends object
    ? ApplyDispatchToAll<T[K]>
    : T[K];
};

export const applyDispatch = (dispatch: any) => <T>(actions: T): ApplyDispatchToAll<T> =>
  traverse(
    v => typeof v === 'function',
    fn => fn(dispatch),
  )(actions) as ApplyDispatchToAll<T>;
