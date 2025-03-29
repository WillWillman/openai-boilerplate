import { array, boolean, number, object, ref, string } from './schemaHelpers';


const body = object({
  definitions: {
    HexCoordinate: object({
      required: [
        'q',
        'r',
      ],
      q: number,
      r: number,
    }),
    Hex: object({
      required: [
        'coordinate',
        'resourceType',
      ],
      coordinate: ref('HexCoordinate'),
      resourceType: {
        ...string,
        enum: [
          'brick',
          'lumber',
          'wool',
          'grain',
          'ore',
          'desert',
          'frostfangs',
        ]
      },
      numberToken: number,
    }),
    Road: object({
      required: [
        'playerId',
        'start',
        'end',
      ],
      playerId: string,
      start: ref('HexCoordinate'),
      end: ref('HexCoordinate'),
    }),
    Settlement: object({
      required: [
        'playerId',
        'coordinate',
      ],
      playerId: string,
      isCity: boolean,
      coordinate: ref('HexCoordinate'),
    }),
    DevelopmentCard: object({
      required: [
        'type',
      ],
      type: {
        ...string,
        enum: [
          'knight',
          'victoryPoint',
          'roadBuilding',
          'yearOfPlenty',
          'monopoly',
        ]
      },
    }),
    BoardState: object({
      required: [
        'hexes',
        'robberPosition',
        'roads',
        'settlements',
        'developmentCards',
      ],
      hexes: array(ref('Hex')),
      robberPosition: ref('HexCoordinate'),
      roads: array(ref('Road')),
      settlements: array(ref('Settlement')),
      developmentCards: array(ref('DevelopmentCard')),
    }),
    PlayerResources: object({
      required: [
        'brick',
        'lumber',
        'wool',
        'grain',
        'ore',
      ],
      brick: number,
      lumber: number,
      wool: number,
      grain: number,
      ore: number,
    }),
    PlayerState: object({
      required: [
        'playerId',
        'playerName',
        'color',
        'resources',
        'victoryPoints',
      ],
      playerId: string,
      playerName: string,
      color: {
        ...string,
        enum: [
          'red',
          'blue',
          'white',
          'orange',
        ]
      },
      resources: ref('PlayerResources'),
      victoryPoints: number,
    }),
    GameState: object({
      phase: string,
      turnNumber: number,
      currentDiceRoll: number,
      activePlayerId: string,
      board: ref('BoardState'),
      players: array(ref('PlayerState')),
      required: [
        'required',
        'phase',
        'turnNumber',
        'currentDiceRoll',
        'activePlayerId',
        'board',
        'players',
      ],
    })
  },
  properties: {
    id: string,
    name: string,
    gameState: ref('GameState'),
  },
  required: [
    'name',
    'gameState',
  ],
});

const query = object({
  properties: string,
});

export const gameState = {
  name: 'gameStates',
  dbName: 'mcts',
  schema: {
    body,
    query,
  },
};
