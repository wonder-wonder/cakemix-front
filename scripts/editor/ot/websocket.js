const EventEmitter = require('events')
const socket = {}

socket.SocketConnection = (function () {
  'use strict'

  function SocketConnection(url) {
    this.url = url
    this.ws = null

    const ws = (this.ws = new WebSocket(this.url))
    const self = this

    ws.onopen = function (evt) {
      self.emit('open', evt)
    }

    ws.onclose = function (evt) {
      self.emit('close', evt)
    }

    ws.onmessage = function (evt) {
      const m = JSON.parse(evt.data)
      if (m && m.e) {
        self.emit(m.e, m.d, evt)
      }
    }
  }

  SocketConnection.prototype = new EventEmitter()

  SocketConnection.prototype.send = function (eventName, data) {
    this.ws.send(JSON.stringify({ e: eventName, d: data }))
  }

  return SocketConnection
})()

socket.SocketConnectionAdapter = (function () {
  'use strict'

  function SocketConnectionAdapter(conn) {
    this.conn = conn

    const self = this
    conn.on('quit', function (clientId) {
      self.trigger('client_left', clientId)
    })

    conn.on('join', function (data) {
      const clientId = data.client_id
      const name = data.username
      self.trigger('set_name', clientId, name)
    })

    conn.on('ok', function () {
      self.trigger('ack')
    })

    conn.on('op', function (data) {
      const clientId = data[0]
      const operation = data[1]
      const selection = data[2]
      self.trigger('operation', operation)
      self.trigger('selection', clientId, selection)
    })

    conn.on('sel', function (data) {
      const clientId = data[0]
      const selection = data[1]
      self.trigger('selection', clientId, selection)
    })

    conn.on('reconnect', function () {
      self.trigger('reconnect')
    })
  }

  SocketConnectionAdapter.prototype.sendOperation = function (
    revision,
    operation,
    selection
  ) {
    this.conn.send('op', [revision, operation, selection])
  }

  SocketConnectionAdapter.prototype.sendSelection = function (selection) {
    this.conn.send('sel', selection)
  }

  SocketConnectionAdapter.prototype.registerCallbacks = function (cb) {
    this.callbacks = cb
  }

  SocketConnectionAdapter.prototype.trigger = function (event) {
    const args = Array.prototype.slice.call(arguments, 1)
    const action = this.callbacks && this.callbacks[event]
    if (action) {
      action.apply(this, args)
    }
  }

  return SocketConnectionAdapter
})()

module.exports = socket
