export const collectNodes = (node) => [
  node,
  ...node.children.flatMap(collectNodes)
].flat();
