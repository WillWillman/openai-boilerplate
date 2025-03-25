export const backPropagate = (node, reward) => {
  let current = node;
  while (current) {
    current.visits += 1;
    current.value += reward;
    current = current.parent;
  }
};
