import { gameState } from './gameStates';
import { node } from './nodes';
import { IResource } from 'src/service/libs';

export const resources: Record<string, IResource.Resource> = {
  gameState,
  node,
};
