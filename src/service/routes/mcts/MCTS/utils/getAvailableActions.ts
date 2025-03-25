export const getAvailableActions = (state, extensionActions) => {
  return extensionActions && extensionActions.length > 0 ? extensionActions : ['robber', 'trade'];
};
