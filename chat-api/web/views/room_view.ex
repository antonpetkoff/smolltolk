defmodule Chat.RoomView do
  use Chat.Web, :view

  def render("index.json", %{page: page}) do
    %{
      data: render_many(page.entries, Chat.RoomView, "room.json"),
      pagination: Chat.PaginationHelpers.pagination(page)
    }
  end

  def render("show.json", %{room: room}) do
    %{data: render_one(room, Chat.RoomView, "room.json")}
  end

  def render("room.json", %{room: room}) do
    %{
      id: room.id,
      name: room.name,
      topic: room.topic
    }
  end
end
