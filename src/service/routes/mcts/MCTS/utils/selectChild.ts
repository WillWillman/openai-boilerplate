export const selectChild = (node, explorationConstant) => {
  let bestChild = null;
  let bestValue = -Infinity;
  for (const child of node.children) {
    const exploitation = child.visits ? child.value / child.visits : 0;
    const exploration = explorationConstant * Math.sqrt(Math.log(node.visits + 1) / (child.visits + 1));
    const uctValue = exploitation + exploration;
    if (uctValue > bestValue) {
      bestValue = uctValue;
      bestChild = child;
    }
  }
  return bestChild;
};
