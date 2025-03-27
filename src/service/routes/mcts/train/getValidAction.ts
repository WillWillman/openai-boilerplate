// Helper function
const activateRobber = (state) => {
  // Players with more than 7 cards must discard half
  state
    .players
    .forEach(player => {
      const totalResources = Object
        .values(player.resources)
        .reduce<number>((sum: number, count: number) => sum + count, 0);

      if (totalResources > 7) {
        const discardCount = Math.floor(totalResources / 2);
        let remaining = discardCount;

        // Simplified discard logic
        ['brick', 'grain', 'lumber', 'ore', 'wool'].forEach(resource => {
          const discard = Math.min(player.resources[resource], remaining);
          player.resources[resource] -= discard;
          remaining -= discard;
        });
      }
    });

  return state;
};

type MinimumGameState = {
  players: {
    victoryPoints: number;
    playerId: any;
    resources: Record<string, number>;
  }[],
  board: {
    robberPosition: number;
    hexes: {
      coordinate: number;
      numberToken: number;
      resourceType: string;
    }[]
  },
  activePlayerId: any;
  turnNumber: number;
};

const actions = new Map<string, <T extends MinimumGameState>(state: T) => T>()
  // Resource production
  .set('rollDice', (state) => {
    const dice = Math.floor(Math.random() * 6) + 1 + Math.floor(Math.random() * 6) + 1;

    // If 7 is rolled, activate robber
    if (dice === 7) {
      return activateRobber(state);
    }

    // Find all hexes with the rolled number
    const matchingHexes = state.board.hexes.filter(hex => hex.numberToken === dice);

    // Distribute resources to players based on settlements/cities adjacent to these hexes
    // This would require adding settlements/cities to the game state
    // For now, just a placeholder implementation
    state.players.forEach(player => {
      matchingHexes.forEach(hex => {
        // Check if player has settlements adjacent to this hex
        // Add resources accordingly
        const resourceType = hex.resourceType;
        if (resourceType !== 'desert') {
          player.resources[resourceType.toLowerCase()] += 1; // Simplified
        }
      });
    });

    return state;
  })

  // Building actions
  .set('buildRoad', (state) => {
    const activePlayer = state.players.find(p => p.playerId === state.activePlayerId);

    // Check if player has resources
    if (activePlayer.resources.brick >= 1 && activePlayer.resources.lumber >= 1) {
      // Deduct resources
      activePlayer.resources.brick -= 1;
      activePlayer.resources.lumber -= 1;

      // Add road (would need to add roads to game state)
      // state.roads.push({ playerId: activePlayer.playerId, position: ... });
    }

    return state;
  })

  .set('buildSettlement', (state) => {
    const activePlayer = state.players.find(p => p.playerId === state.activePlayerId);

    // Check if player has resources
    if (activePlayer.resources.brick >= 1 && activePlayer.resources.lumber >= 1 &&
      activePlayer.resources.wool >= 1 && activePlayer.resources.grain >= 1) {
      // Deduct resources
      activePlayer.resources.brick -= 1;
      activePlayer.resources.lumber -= 1;
      activePlayer.resources.wool -= 1;
      activePlayer.resources.grain -= 1;

      // Add settlement (would need to add settlements to game state)
      // state.settlements.push({ playerId: activePlayer.playerId, position: ... });

      // Add victory point
      activePlayer.victoryPoints += 1;
    }

    return state;
  })

  .set('buildCity', (state) => {
    const activePlayer = state.players.find(p => p.playerId === state.activePlayerId);

    // Check if player has resources
    if (activePlayer.resources.ore >= 3 && activePlayer.resources.grain >= 2) {
      // Deduct resources
      activePlayer.resources.ore -= 3;
      activePlayer.resources.grain -= 2;

      // Upgrade settlement to city (would need to modify settlements in game state)
      // Find a settlement owned by the player and upgrade it

      // Add victory point
      activePlayer.victoryPoints += 1;
    }

    return state;
  })

  // Robber actions
  .set('moveRobber', (state) => {
    // Move robber to a new hex
    const randomHexIndex = Math.floor(Math.random() * state.board.hexes.length);
    state.board.robberPosition = state.board.hexes[randomHexIndex].coordinate;

    // Steal resource from a player with adjacent settlement
    // This is simplified - would need to check for adjacent settlements
    const victimIndex = Math.floor(Math.random() * state.players.length);
    const victim = state.players[victimIndex];
    const activePlayer = state.players.find(p => p.playerId === state.activePlayerId);

    // Only steal if victim is not the active player and has resources
    if (victim.playerId !== activePlayer.playerId) {
      const resourceTypes = ['brick', 'grain', 'lumber', 'ore', 'wool'];
      const availableResources = resourceTypes.filter(type => victim.resources[type] > 0);

      if (availableResources.length > 0) {
        const resourceToSteal = availableResources[Math.floor(Math.random() * availableResources.length)];
        victim.resources[resourceToSteal] -= 1;
        activePlayer.resources[resourceToSteal] += 1;
      }
    }

    return state;
  })

  // Trading actions
  .set('tradeWithBank', (state) => {
    const activePlayer = state.players.find(p => p.playerId === state.activePlayerId);

    // Find resource player has 4+ of
    const resourceTypes = ['brick', 'grain', 'lumber', 'ore', 'wool'];
    const tradableResources = resourceTypes.filter(type => activePlayer.resources[type] >= 4);

    if (tradableResources.length > 0) {
      // Trade 4:1
      const resourceToGive = tradableResources[Math.floor(Math.random() * tradableResources.length)];
      const resourceToGet = resourceTypes[Math.floor(Math.random() * resourceTypes.length)];

      activePlayer.resources[resourceToGive] -= 4;
      activePlayer.resources[resourceToGet] += 1;
    }

    return state;
  })

  // Turn management
  .set('endTurn', (state) => {
    // Move to next player
    const playerCount = state.players.length;
    state.activePlayerId = ((state.activePlayerId + 1) % playerCount) || playerCount;

    // Increment turn number if we've gone around to player 1
    if (state.activePlayerId === 1) {
      state.turnNumber += 1;
    }

    return state;
  });

const getRandomMapItem = (Map: Map<string, any>) => {
  const keys = Array.from(Map.keys());
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  return {
    name: randomKey,
    call: Map.get(randomKey)
  };
}


export const getValidAction = (config) => {
  const activePlayer = config.gameState.players.find(p => p.playerId === config.gameState.activePlayerId);
  const validActions = new Map();

  // Always valid
  validActions.set('rollDice', actions.get('rollDice'));
  validActions.set('endTurn', actions.get('endTurn'));

  // Resource-dependent actions
  if (activePlayer.resources.brick >= 1 && activePlayer.resources.lumber >= 1) {
    validActions.set('buildRoad', actions.get('buildRoad'));
  }

  // Add other conditional actions...

  return getRandomMapItem(validActions);
};
