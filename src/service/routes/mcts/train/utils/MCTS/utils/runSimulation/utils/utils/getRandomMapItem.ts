export const getRandomMapItem = (Map: Map<string, any>) => {
  const keys = Array.from(Map.keys());
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  return {
    name: randomKey,
    call: Map.get(randomKey)
  };
}
