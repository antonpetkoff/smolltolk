defmodule Chat.Message do
  use Chat.Web, :model

  schema "messages" do
    field :text, :string
    belongs_to :room, Chat.Room
    belongs_to :user, Chat.User

    timestamps()
  end

  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:text, :user_id, :room_id])
    |> validate_required([:text, :user_id, :room_id])
  end
end
