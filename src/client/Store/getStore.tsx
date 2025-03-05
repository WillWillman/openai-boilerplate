import { bindActionCreators, combineReducers } from 'redux';
import { getResourceActions } from './actions';
import { getResourceReducers } from './reducers';
import { useDispatch } from 'react-redux';

const combineActions = (actions) => () =>
  Object.keys(actions).reduce((acc, key) => {
    const dispatch = useDispatch();
    acc[key] = bindActionCreators(actions[key], dispatch);
    Object.keys(actions[key]).forEach((action) => {
      acc[key][action].signature = actions[key][action].toString();
    });
    return acc;
  }, {});

export const getStore = (config) => {
  const { actions, reducers } = config
    .data
    .resources
    .reduce((acc, resource) => {
      acc.actions[resource] = getResourceActions(resource);
      acc.reducers[resource] = getResourceReducers(resource);
      return acc;
    }, { actions: {}, reducers: {} });

  return {
    actions: combineActions(actions),
    rootReducer: combineReducers(reducers),
  }
};
