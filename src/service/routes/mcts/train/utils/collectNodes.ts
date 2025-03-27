const getId = (node) => node?.id;

const sanitizeNode = (node) => ({
  ...node,
  parent: getId(node.parent),
  children: node.children.map(getId),
});

type CollectNodes = <T extends { children: T[] }>(node: T) => T[];
export const collectNodes: CollectNodes = (node) => [
  sanitizeNode(node),
  ...node.children.flatMap(child => collectNodes(child))
];
