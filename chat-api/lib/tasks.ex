defmodule Chat.ReleaseTasks do
  def migrate do
    {:ok, _} = Application.ensure_all_started(:chat)

    path = Application.app_dir(:chat, "priv/repo/migrations")

    Ecto.Migrator.run(Chat.Repo, path, :up, all: true)
  end
end
