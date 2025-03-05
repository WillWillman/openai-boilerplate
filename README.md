# Getting Started for Development

## 1. Install Node Version
- Use the Node version specified in the .nvmrc file.
  Example: `nvm use`

## 2. Set Up Environment Variables
- Update the [.env](./.env) file in the root directory with the required environment variables.
  Example:
  ```
  PORT=3000
  DATA_URI=mongodb+srv://[user]:[password]@[cluster].[instance].mongodb.net
  DATA_DB=your_database_name
  DATA_RESOURCES='["resource1", "resource2"]'

  DATA_OPTIONS='{}'
  OPENAI_API_KEY=your_openai_api_key
  OPENAI_API_ORGANIZATION=your_openai_organization
  OPENAI_DEFAULT_MODEL=gpt-4o
  OPENAI_OPTIONS='{}'
  ```
- Add additional configs:
    - [Client Config file](./src/client/config.ts)
        - Must add new env variables to [webpack](./webpack.js)
    - [Server Config File](./src/service/config.ts)
- Check in .env updates:
    - start tracking .env `git update-index --no-skip-worktree .env`
    - stop tracking again `git update-index --skip-worktree .env`

## 3. Install Dependencies
- Run: `yarn`

## 4. Run in Development Mode
- `yarn dev`
    - The client will be built using `webpack.js` in watch mode.
    - The server will use nodemon to watch for changes in the `src/service` directory.

## 5. Access the App
- Once started, the server runs on [http://localhost:[port]](http://localhost:3000) (3000 by default)

## 6. DATA_RESOURCES
- Will create default CRUD routes as well as redux actions and reducers
- There is a default `/` route that returns the [Home](./src/client/routes/Home/Home.tsx) component which can be used as an example route for prototyping (go [http://localhost:[port]](http://localhost:3000) to see the store thats generated printed out)

## New from Template Extension
https://marketplace.visualstudio.com/items?itemName=PolymerMallard.new-from-template

Update or add Templates here:
.vscode/templates/ReactComponent
