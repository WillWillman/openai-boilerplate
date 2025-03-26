const sumArray = (acc, count) => acc + count;
const sumObjectValues = (values) => Object.values(values).reduce(sumArray, 0);
const sumPlayerScore = (player) => player.victoryPoints + sumObjectValues(player.resources);

export const getAvgScore = (players) => {
  const totalScore = players
    .map(sumPlayerScore)
    .reduce(sumArray, 0);

  return totalScore / players.length;
}