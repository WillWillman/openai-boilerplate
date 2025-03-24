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

const rulesSchema = {
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
      required: ['gameId', 'turnNumber', 'activePlayerId', 'board', 'players'],
      gameId: string,
      turnNumber: number,
      activePlayerId: string,
      board: { $ref: '#/definitions/BoardState' },
      players: array({ $ref: '#/definitions/PlayerState' }),
    }),
    TrainingParams: object({
      required: ['simulationCount', 'explorationConstant'],
      simulationCount: number,
      explorationConstant: number,
    }),
  },
  properties: {
    name: string,
    gameState: { $ref: '#/definitions/GameState' },
    trainingParams: { $ref: '#/definitions/TrainingParams' },
  },
  required: ['gameState', 'trainingParams']
};

export const rules = ({
  name: 'rules',
  schema: {
    body: rulesSchema,
    query: object({
      name: string,
    }),
  },
});
