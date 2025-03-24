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

type Schema = Record<string, any>

export const createGenericSchema = (gameSchema: Schema): Schema => ({
  $schema: 'http://json-schema.org/draft-07/schema#',
  definitions: {
    Choice: object({
      required: ['choiceId', 'description'],
      choiceId: string,
      description: string,
      cost: {
        type: 'object',
        additionalProperties: number
      },
      outcome: {
        type: ['object', 'array', 'string', 'number', 'boolean', 'null']
      }
    }),
    Stage: object({
      required: ['stageId', 'stageName', 'validChoices'],
      stageId: string,
      stageName: string,
      validChoices: array({ $ref: '#/definitions/Choice' }),
      instructions: string,
      timeoutSeconds: number
    }),
    GameTurn: object({
      required: ['currentStage'],
      currentStage: { $ref: '#/definitions/Stage' }
    }),
    ...gameSchema.definitions
  },
  type: 'object',
  properties: {
    gameTurn: { $ref: '#/definitions/GameTurn' },
    ...gameSchema.properties
  },
  required: ['gameTurn', ...gameSchema.required ?? []]
});

export const getCatanSchema = (): Schema => ({
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
    CatanGameState: object({
      required: ['gameId', 'turnNumber', 'activePlayerId', 'board', 'players'],
      gameId: string,
      turnNumber: number,
      activePlayerId: string,
      board: { $ref: '#/definitions/BoardState' },
      players: array({ $ref: '#/definitions/PlayerState' }),
    })
  },
  properties: {
    catanGameState: { $ref: '#/definitions/CatanGameState' }
  },
  required: ['catanGameState']
});

export const rules = {
  name: 'rules',
  schema: {
    body: getCatanSchema(),
    query: object({
      game: string,
    }),
  },
};
