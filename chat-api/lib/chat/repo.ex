defmodule Chat.Repo do
  use Ecto.Repo, otp_app: :chat
  use Scrivener, page_size: 25

  def init(_, opts) do
    {:ok, Keyword.put(opts, :url, System.get_env("DATABASE_URL"))}
  end
end
