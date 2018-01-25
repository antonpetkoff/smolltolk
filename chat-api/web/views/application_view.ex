defmodule Chat.ApplicationView do
  use Chat.Web, :view

  def render("not_found.json", _) do
    %{error: "Not found"}
  end
end
