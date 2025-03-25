
const string = { type: 'string' };
const number = { type: 'number' };
const array = (items) => ({ type: 'array', items });

const object = ({
  additionalProperties = false,
  required = [],
  ...properties
}) => ({
  type: 'object',
  properties,
  additionalProperties,
  required,
});

export const gameStateSchema = {
  definitions: {
    HexCoordinate: object({
      required: ['q', 'r'],
      q: number,
      r: number,
    }),
    Hex: object({
      required: ['coordinate', 'resourceType'],
      coordinate: { $ref: '#/definitions/HexCoordinate' },
      resourceType: {
        type: 'string',
        enum: ['brick', 'lumber', 'wool', 'grain', 'ore', 'desert', 'frostfangs']
      },
      numberToken: number,
    }),
    BoardState: object({
      required: ['hexes', 'robberPosition'],
      hexes: array({ $ref: '#/definitions/Hex' }),
      robberPosition: { $ref: '#/definitions/HexCoordinate' },
    }),
    PlayerResources: object({
      required: ['brick', 'lumber', 'wool', 'grain', 'ore'],
      brick: number,
      lumber: number,
      wool: number,
      grain: number,
      ore: number,
    }),
    PlayerState: object({
      required: ['playerId', 'playerName', 'color', 'resources', 'victoryPoints'],
      playerId: string,
      playerName: string,
      color: {
        type: 'string',
        enum: ['red', 'blue', 'white', 'orange']
      },
      resources: { $ref: '#/definitions/PlayerResources' },
      victoryPoints: number,
    }),
    GameState: object({
      required: ['turnNumber', 'activePlayerId', 'board', 'players'],
      turnNumber: number,
      activePlayerId: string,
      board: { $ref: '#/definitions/BoardState' },
      players: array({ $ref: '#/definitions/PlayerState' }),
    })
  },
  properties: {
    id: string,
    name: string,
    gameState: { $ref: '#/definitions/GameState' },
  },
  required: ['name', 'gameState']
};

export const trainSchema = {
  body: {
    type: 'object',
    properties: {
      type: 'object',
      properties: {
        gameStateId: { type: 'string' },
        simulationCount: { type: 'number' },
        explorationConstant: { type: 'number' },
        extensionActions: { type: 'array', items: { type: 'string' } },
        maxDepth: { type: 'number' },
      },
      required: ['gameId', 'gameState', 'simulationCount', 'explorationConstant', 'maxDepth'],
    },
  },
}

export const nodesSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    gameId: { type: 'string' },
    state: { type: 'object' },
    action: { type: 'string' },
    parent: { type: 'string' },
    children: { type: 'array', items: { type: 'string' } },
    visits: { type: 'number' },
    value: { type: 'number' }
  },
  required: ['id', 'state', 'action', 'parent', 'children', 'visits', 'value']
};

export const trainingResultsSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    gameId: { type: 'string' },
    simulationIndex: { type: 'number' },
    reward: { type: 'number' }
  },
  required: ['simulationIndex', 'reward']
};

export const listSchema = {
  query: {
    gameId: { type: 'string' },
  },
};
