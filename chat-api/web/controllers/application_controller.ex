defmodule Chat.ApplicationController do
  use Chat.Web, :controller

  def not_found(conn, _params) do
    conn
    |> put_status(:not_found)
    |> render(Chat.ApplicationView, "not_found.json")
  end
end
