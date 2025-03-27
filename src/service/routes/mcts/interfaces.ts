import { IData, IServer } from '../../libs';

type IDao = {
  gameStates: IData.Methods,
  nodes: IData.Methods,
};

export {
  IServer,
  IDao,
};