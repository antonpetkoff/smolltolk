
#### Running the Phoenix app

Download dependencies

```
cd chat-api
mix deps.get
```

Create and migrate the database

```
mix ecto.create ecto.migrate
```

Start the server

```
mix phoenix.server
```

#### Running the React app

Install [Yarn](https://github.com/yarnpkg/yarn)

Install dependencies

```
cd client
yarn
```

Copy `.env.example` contents into to a new `.env` file

Start the dev server

```
npm start
```

#### Production

Edit the database connection config in `/config/prod.exs` or `config/prod.secret.exs`
with your postgres user info if needed

## Building docker container for production

First ensure you have `edib` tool installed.
You can install it with `mix archive.install https://git.io/edib-0.11.0.ez`.

Create the container for production `MIX_ENV=prod mix edib --edib edib/edib-tool:latest`

If you want just to build the applilcation and have an executable to run - `MIX_ENV=prod mix release`
