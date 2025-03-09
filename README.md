# Getting Started for Development

## 1. Install Node Version
- Use the Node version specified in the .nvmrc file.
  Example: `nvm use`

## 2. Set Up Environment Variables
- Update the [.env](./.env) file in the root directory with the required environment variables.
  Example:
  ```
  NODE_ENV='development'
  PORT=3000

  ON_REQUEST_ENABLED='true'
  ON_REQUEST_LOG_BODY='false'
  ON_REQUEST_LOG_HEADERS='false'

  ON_RESPONSE_ENABLED='false'
  ON_RESPONSE_LOG_BODY='false'
  ON_RESPONSE_LOG_HEADERS='false'

  LOGGER_LEVELS='["*"]'

  CLIENT_REACT_ROUTER='{"future":{"v7_startTransition":true,"v7_relativeSplatPath":true}}'
  CLIENT_STORE_DEV_TOOLS='true'

  RESOURCES='[{"name":"resource","schema":{"body": {"type": "object", "properties": {"id":{"type":"string"}}, "additionalProperties": false}, "query": {"type": "object", "properties": {"id":{"type":"string"}}, "additionalProperties": false}}}]'

  DATA_URI='mongodb+srv://[user]:[password]@[cluster].[instance].mongodb.net'
  DATA_OPTIONS='{}'
  DATA_DB='dafault'

  OPENAI_API_KEY=''
  OPENAI_API_ORGANIZATION='org-'
  OPENAI_API_OPTIONS='{}'
  ```

- Check in .env updates:
  - start tracking .env `git update-index --no-skip-worktree .env`
  - stop tracking again `git update-index --skip-worktree .env`

- Add additional configs:
    - [Server Config File](./src/config/server-config.ts)
    - [Client Config file](./src/config/client-config.ts)
        - Must add new env variables to [webpack](./webpack.js)
        - Do not add sensitive info to the client-config.ts or resources directory files as they will be built using webpack into the bundle!


## 3. Install Dependencies
- Run: `yarn`

## 4. Run in Development Mode
- `yarn dev`
    - The client will be built using `webpack.js` in watch mode.
    - The server will use nodemon to watch for changes in the `src/service` directory.

## 5. Access the App
- Once started, the server runs on [http://localhost:[port]](http://localhost:3000) (3000 by default)
- The Home route
    - Uses an initData function call in the useEffect to pull all data and make a call to the openApi endpoint
    - The default component PrintProps will print out the props (store + actions) as json

# RESOURCES
- Create default CRUD server routes as well as client redux actions and reducers.
- Can be set in code by exporting from the [Resource Array](./src/config/resources/index.ts)
  - Note: the resource named "resource" is just a mock and can be removed
- Can be set by passing env variable
- Each resource must contain
  - name: name of resource
    - used for collection name and endpoint (Server) and reducer name (Client)
  - schema
    - body: define the shape of the data
    - query: define the query params that can be used to filter data

## New from Template Extension
1. Install [extension](https://marketplace.visualstudio.com/items?itemName=PolymerMallard.new-from-template)
1. Update or add Templates here: .vscode/templates
1. Right click on directory where you want to add from template, select template, and fill out inputs

# Templates
1. ReactComponent:
  - Generates a component connected with all the state and actions from store and prints out a hello world and with all the props
