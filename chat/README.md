# Chat

To start your Phoenix server:

  * Install dependencies with `mix deps.get`
  * Create and migrate your database with `mix ecto.create && mix ecto.migrate`
  * Install Node.js dependencies with `cd assets && npm install`
  * Start Phoenix endpoint with `mix phx.server`

  To run in interactive mode `MIX_ENV=prod PORT=4000 iex -S mix`.
  Environment variables are just for the sake of the full example.

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

Ready to run in production? Please [check our deployment guides](http://www.phoenixframework.org/docs/deployment).

## Building docker container for production

First ensure you have `edib` tool installed.
You can install it with `mix archive.install https://git.io/edib-0.11.0.ez`.

Create the container for production `MIX_ENV=prod mix edib --edib edib/edib-tool:latest`

If you want just to build the applilcation and have an executable to run - `MIX_ENV=prod mix release`

## Learn more

  * Official website: http://www.phoenixframework.org/
  * Guides: http://phoenixframework.org/docs/overview
  * Docs: https://hexdocs.pm/phoenix
  * Mailing list: http://groups.google.com/group/phoenix-talk
  * Source: https://github.com/phoenixframework/phoenix
