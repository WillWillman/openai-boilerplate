export const sanitizeNode = (node) => {
  const sanitized = {
    ...node,
    parent: node.parent ? node.parent.id : null,
    childrenIds: node.children.map(child => child.id)
  };

  delete sanitized.children;

  return sanitized;
};
