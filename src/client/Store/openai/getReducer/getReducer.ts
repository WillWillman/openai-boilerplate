import { Actions } from '../getActions';

export const getReducer = () => (
  state = {
    chatCompletions: {
      asObj: {},
      asArray: [],
    },
    models: [],
  },
  action,
) => {
  switch (action.type) {
  case Actions.CHAT_COMPLETION: {
    const asArray = [
      ...state.chatCompletions.asArray,
      action.payload,
    ];

    return {
      ...state,
      chatCompletions: {
        asObj: asArray.reduce((acc, item) => {
          acc[item.id] = item;
          return acc;
        }, {}),
        asArray,
      },
    };
  }

  case Actions.MODELS_LIST: {
    return {
      ...state,
      models: action
        .payload
        .sort((a, b) => b.created - a.created)
        .map(({ id }) => id),
    };
  }

  default:
    return state;
  }
};
