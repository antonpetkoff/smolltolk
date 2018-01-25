defmodule Chat.MessageController do
  use Chat.Web, :controller

  plug Guardian.Plug.EnsureAuthenticated, handler: Chat.SessionController

  def index(conn, params) do
    last_seen_id = params["last_seen_id"] || 0
    room = Repo.get!(Chat.Room, params["room_id"])

    page =
      Chat.Message
      |> where([m], m.room_id == ^room.id)
      |> where([m], m.id < ^last_seen_id)
      |> order_by([desc: :inserted_at, desc: :id])
      |> preload(:user)
      |> Chat.Repo.paginate()

    render(conn, "index.json", %{messages: page.entries, pagination: Chat.PaginationHelpers.pagination(page)})
  end
end
