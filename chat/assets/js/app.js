// Brunch automatically concatenates all files in your
// watched paths. Those paths can be configured at
// config.paths.watched in 'brunch-config.js'.
//
// However, those files will only be executed if
// explicitly imported. The only exception are files
// in vendor, which are never wrapped in imports and
// therefore are always executed.

import {Socket} from 'phoenix'
import $ from 'jquery'

class App {
  static init() {
    const $status   = $('#status');
    const $messages = $('#messages');
    const $input    = $('#message-input');
    const $username = $('#username');

    // TODO: after the user is logged in (registered) with his ID
    const socket = this.createSocket('/socket', {user_id: 42});
    // TODO: use special auth token for rooms?
    const lobbyChannel = this.joinChannel(socket, 'room:lobby', {});

    // send entered message by user on Enter key press
    $input.off('keypress').on('keypress', event => {
      if (event.keyCode === 13) {
        lobbyChannel.push('new:msg', {
          user: $username.val(),
          body: $input.val()
        });
        $input.val('');
      }
    });

    // update messages when a new message is received
    lobbyChannel.on('new:msg', message => {
      $messages.append(this.messageTemplate(message));
      scrollTo(0, document.body.scrollHeight);
    });

    lobbyChannel.on('user:entered', message => {
      const username = this.sanitize(message.user || 'anonymous');
      $messages.append(`<br/><i>[${username}] entered</i>`);
    })
  }

  static sanitize(html) {
    return $('<div/>').text(html).html();
  }

  static messageTemplate(msg) {
    let username = this.sanitize(msg.user || "anonymous");
    let body     = this.sanitize(msg.body);

    return(`<p><a href="#">[${username}]</a>&nbsp; ${body}</p>`);
  }

  static createSocket(mountPoint, params) {
    const socket = new Socket('/socket', {
      logger(kind, msg, data) {
        console.log(`${kind}: ${msg}`, data);
      }
    });

    socket.connect(params);
    socket.onOpen(this.log('socket open'));
    socket.onError(this.log('socket error'));
    socket.onClose(this.log('socket close'));

    return socket;
  }

  static joinChannel(socket, topic, params) {
    const channel = socket.channel(topic, params);
    const TIMEOUT = 10000

    channel.join(TIMEOUT)
      .receive('ignore', () => console.log(`[${topic}] authentication error`))
      .receive('ok', () => console.log(`[${topic}] successful join`))
      .receive('timeout', () => console.log(`[${topic}] connection interruption`));

    channel.onError(this.log(`[${topic}] error`));
    channel.onError(this.log(`[${topic}] closed`));

    return channel;
  }

  static log(eventType) {
    return (event) => console.log(eventType, event);
  }
}

App.init();

export default App
