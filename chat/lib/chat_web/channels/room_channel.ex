defmodule ChatWeb.RoomChannel do
    use Phoenix.Channel
    require Logger

    def join("room:lobby", message, socket) do
        Process.flag(:trap_exit, true)

        :timer.send_interval(5000, :ping)
        send(self(), {:after_join, message})

        {:ok, socket}
    end

    def join(_topic, _message, _socket) do
        {:error, %{reason: "unauthorized"}}
    end

    def handle_info(:ping, socket) do
        push socket, "new:msg", %{user: "SYSTEM", body: "ping"}
        {:noreply, socket}
    end

    def handle_info({:after_join, msg}, socket) do
        # notify all users that a new user has entered
        broadcast! socket, "user:entered", %{user: msg["user"]}

        # tell the user he/she is connected
        push socket, "join", %{status: "connected"}
        {:noreply, socket}
    end

    def terminate(reason, _socket) do
        Logger.debug "leave #{inspect reason}"
        :ok
    end

    # when a user sends a new message, broadcast it in the lobby
    def handle_in("new:msg", msg, socket) do
        sender = msg["user"]
        broadcast! socket, "new:msg", %{user: sender, body: msg["body"]}
        {:reply, {:ok, %{msg: msg["body"]}}, assign(socket, :user, sender)}
    end

end
