import { IOpenAI, IServer } from '../../libs';

const trainingData = {
  "name": "catan",
  "gameState": {
    "gameId": "string",
    "turnNumber": 0,
    "activePlayerId": "string",
    "board": {
      "hexes": [
        {
          "coordinate": {
            "q": 0,
            "r": 0
          },
          "resourceType": "brick",
          "numberToken": 5
        },
        {
          "coordinate": {
            "q": 1,
            "r": 0
          },
          "resourceType": "lumber",
          "numberToken": 2
        },
        {
          "coordinate": {
            "q": 2,
            "r": 0
          },
          "resourceType": "wool",
          "numberToken": 6
        },
        {
          "coordinate": {
            "q": -1,
            "r": 1
          },
          "resourceType": "grain",
          "numberToken": 8
        },
        {
          "coordinate": {
            "q": 0,
            "r": 1
          },
          "resourceType": "ore",
          "numberToken": 10
        },
        {
          "coordinate": {
            "q": 1,
            "r": 1
          },
          "resourceType": "desert",
          "numberToken": 0
        },
        {
          "coordinate": {
            "q": 2,
            "r": 1
          },
          "resourceType": "frostfangs",
          "numberToken": 0
        }
      ],
      "robberPosition": {
        "q": 0,
        "r": 0
      }
    },
    "players": [
      {
        "playerId": "string",
        "playerName": "string",
        "color": "red",
        "resources": {
          "brick": 0,
          "lumber": 0,
          "wool": 0,
          "grain": 0,
          "ore": 0
        },
        "victoryPoints": 0
      },
      {
        "playerId": "string",
        "playerName": "string",
        "color": "blue",
        "resources": {
          "brick": 0,
          "lumber": 0,
          "wool": 0,
          "grain": 0,
          "ore": 0
        },
        "victoryPoints": 0
      },
      {
        "playerId": "string",
        "playerName": "string",
        "color": "white",
        "resources": {
          "brick": 0,
          "lumber": 0,
          "wool": 0,
          "grain": 0,
          "ore": 0
        },
        "victoryPoints": 0
      },
      {
        "playerId": "string",
        "playerName": "string",
        "color": "orange",
        "resources": {
          "brick": 0,
          "lumber": 0,
          "wool": 0,
          "grain": 0,
          "ore": 0
        },
        "victoryPoints": 0
      }
    ]
  },
  "trainingParams": {
    "simulationCount": 100,
    "explorationConstant": 1.0
  }
}

export const train = (libs: { openAI: IOpenAI.Client }): IServer.Route => ({
  path: '/api/mcts/train',
  method: IServer.Method.GET,

  schema: {},

  handler: async (req, res, next) => {
    const simulateGame = (gameState, trainingParams) => {
      const { simulationCount, explorationConstant } = trainingParams;

      const simulate = (state) => {
        const { players, board, robberPosition } = state;

        const calculatePlayerScore = (player) => {
          const resourceScore = Object.values(player.resources).reduce((acc: number, count: number) => acc + count, 0);
          return player.victoryPoints + resourceScore;
        };

        const scores = players.map(calculatePlayerScore);

        const randomEvent = Math.random() > 0.5 ? 'robber' : 'trade';
        if (randomEvent === 'robber') {
          const randomPlayerIndex = Math.floor(Math.random() * players.length);
          players[randomPlayerIndex].resources.brick = Math.max(0, players[randomPlayerIndex].resources.brick - 1);
        } else {
          players.forEach((player) => {
        player.resources.lumber += 1;
          });
        }

        return scores.reduce((acc, score) => acc + score, 0) / players.length;
      };

      const results = Array(simulationCount)
        .fill(null)
        .map(() => simulate(gameState));

      return results.reduce((acc, score) => acc + score, 0) / simulationCount;
    };

    const response = {
      averageScore: simulateGame(trainingData.gameState, trainingData.trainingParams),
    };

    res.status(200).json(response);
    next();
  },

});
