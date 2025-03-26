export const backPropagate = (config) => {
  let current = config.node;
  while (current) {
    current.visits += 1;
    current.value += config.rewarded;
    current = current.parent;
  }

  return config;
};
