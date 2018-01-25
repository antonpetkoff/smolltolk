defmodule Chat.UserController do
  use Chat.Web, :controller

  alias Chat.User

  plug Guardian.Plug.EnsureAuthenticated, [handler: Chat.SessionController] when action in [:rooms]

  def create(conn, params) do
    changeset = User.registration_changeset(%User{}, params)

    case Repo.insert(changeset) do
      {:ok, user} ->
        new_conn = Guardian.Plug.api_sign_in(conn, user, :access)
        jwt = Guardian.Plug.current_token(new_conn)

        new_conn
        |> put_status(:created)
        |> render(Chat.SessionView, "show.json", user: user, jwt: jwt)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Chat.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def rooms(conn, params) do
    current_user = Guardian.Plug.current_resource(conn)
    page =
      assoc(current_user, :rooms)
      |> Repo.paginate(params)
    render(conn, Chat.RoomView, "index.json", page: page)
  end
end
