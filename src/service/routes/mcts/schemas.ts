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
        ...string,
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
        ...string,
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

export const nodesSchema = {
  type: 'object',
  properties: {
    id: string,
    gameId: string,
    state: object({}),
    action: string,
    parent: string,
    children: array(string),
    visits: number,
    value: number,
  },
  required: ['id', 'state', 'action', 'parent', 'children', 'visits', 'value']
};
