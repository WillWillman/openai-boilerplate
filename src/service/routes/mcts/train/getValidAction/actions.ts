export type MinimumGameState = {
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

export const actions = new Map<string, <T extends MinimumGameState>(state: T) => T>()
  .set('rollDice', (state) => {
    const dice = Math.floor(Math.random() * 6) + 1 + Math.floor(Math.random() * 6) + 1;

    if (dice === 7) {
      state
        .players
        .forEach(player => {
          const totalResources = Object
            .values(player.resources)
            .reduce<number>((sum: number, count: number) => sum + count, 0);

          if (totalResources > 7) {
            const discardCount = Math.floor(totalResources / 2);
            let remaining = discardCount;

            ['brick', 'grain', 'lumber', 'ore', 'wool'].forEach(resource => {
              const discard = Math.min(player.resources[resource], remaining);
              player.resources[resource] -= discard;
              remaining -= discard;
            });
          }
        });

      return state;
    }

    const matchingHexes = state.board.hexes.filter(hex => hex.numberToken === dice);

    state.players.forEach(player => {
      matchingHexes.forEach(hex => {
        const resourceType = hex.resourceType;
        if (resourceType !== 'desert') {
        }
      });
    });

    return state;
  })

  .set('buildRoad', (state) => {
    const activePlayer = state.players.find(p => p.playerId === state.activePlayerId);

    if (activePlayer.resources.brick >= 1 && activePlayer.resources.lumber >= 1) {
      activePlayer.resources.brick -= 1;
      activePlayer.resources.lumber -= 1;

    }

    return state;
  })

  .set('buildSettlement', (state) => {
    const activePlayer = state.players.find(p => p.playerId === state.activePlayerId);

    if (activePlayer.resources.brick >= 1 && activePlayer.resources.lumber >= 1 &&
      activePlayer.resources.wool >= 1 && activePlayer.resources.grain >= 1) {
      activePlayer.resources.brick -= 1;
      activePlayer.resources.lumber -= 1;
      activePlayer.resources.wool -= 1;
      activePlayer.resources.grain -= 1;


      activePlayer.victoryPoints += 1;
    }

    return state;
  })

  .set('buildCity', (state) => {
    const activePlayer = state.players.find(p => p.playerId === state.activePlayerId);

    if (activePlayer.resources.ore >= 3 && activePlayer.resources.grain >= 2) {
      activePlayer.resources.ore -= 3;
      activePlayer.resources.grain -= 2;


      activePlayer.victoryPoints += 1;
    }

    return state;
  })

  .set('moveRobber', (state) => {
    const randomHexIndex = Math.floor(Math.random() * state.board.hexes.length);
    state.board.robberPosition = state.board.hexes[randomHexIndex].coordinate;

    const victimIndex = Math.floor(Math.random() * state.players.length);
    const victim = state.players[victimIndex];
    const activePlayer = state.players.find(p => p.playerId === state.activePlayerId);

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

  .set('tradeWithBank', (state) => {
    const activePlayer = state.players.find(p => p.playerId === state.activePlayerId);

    const resourceTypes = ['brick', 'grain', 'lumber', 'ore', 'wool'];
    const tradableResources = resourceTypes.filter(type => activePlayer.resources[type] >= 4);

    if (tradableResources.length > 0) {
      const resourceToGive = tradableResources[Math.floor(Math.random() * tradableResources.length)];
      const resourceToGet = resourceTypes[Math.floor(Math.random() * resourceTypes.length)];

      activePlayer.resources[resourceToGive] -= 4;
      activePlayer.resources[resourceToGet] += 1;
    }

    return state;
  })

  .set('endTurn', (state) => {
    const playerCount = state.players.length;
    const firstPlaterId = state.players[0].playerId;
    const activePlayer = state.players.map(p => p.playerId).indexOf(state.activePlayerId);
    const nextPlayer = (activePlayer + 1) % playerCount;

    state.activePlayerId = state.players[nextPlayer].playerId;

    if (state.activePlayerId === firstPlaterId) {
      state.turnNumber += 1;
    }

    return state;
  });
