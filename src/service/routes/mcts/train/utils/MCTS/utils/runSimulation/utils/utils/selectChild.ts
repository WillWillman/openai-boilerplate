const exploit = (child) => child.visits ? child.value / child.visits : 0;
const explore = ({ node, explorationConstant, child }) => explorationConstant * Math.sqrt(Math.log(node.visits + 1) / (child.visits + 1));

interface SelectChildParams {
  node: { children: any[] };
  explorationConstant: number;
}

export const selectChild = (config: SelectChildParams) => {
  const reducer = (best, child) => {
    const value = exploit(child) + explore({ ...config, child });
    const result = { child, value };
    return result.value > best.value ? result : best;
  };

  return config
    .node
    .children
    .reduce(reducer, { value: -Infinity, child: null })
    .child;
};
