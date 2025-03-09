export const formatResourceForActionType = (resource: string): string =>
  resource
    .replace(/([a-z])([A-Z])/g, '$1_$2') // Convert camelCase to snake_case
    .replace(/-/g, '_') // Convert hyphen-case to snake_case
    .toUpperCase();

export const createActionTypes = (resource: string) => {
  const formattedResource = formatResourceForActionType(resource);

  return {
    CREATE: `CREATE_${formattedResource}`,
    READ: `READ_${formattedResource}`,
    UPDATE: `UPDATE_${formattedResource}`,
    LIST: `LIST_${formattedResource}`,
    SAVE: `SAVE_${formattedResource}`,
    REMOVE: `REMOVE_${formattedResource}`,
  };
};
