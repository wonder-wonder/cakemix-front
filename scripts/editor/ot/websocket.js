const EventEmitter = require('events')

class SocketConnection extends EventEmitter {
  constructor(_url, _readOnly) {
    super()

    this.url = _url
    this.readOnly = _readOnly
    this.connect()
  }

  connect() {
    if (!this.url) {
      return
    }

    this.ws = new WebSocket(this.url)

    this.ws.onopen = evt => {
      this.emit('open', evt)
    }
    this.ws.onclose = evt => {
      this.emit('close', evt)
    }
    this.ws.onmessage = evt => {
      const m = JSON.parse(evt.data)
      if (m && m.e) {
        this.emit(m.e, m.d, evt)
      }
    }
  }

  reconnect() {
    this.connect()
  }

  close() {
    if (this.ws === null) {
      return
    }
    this.ws.close()
  }

  send(eventName, data) {
    if (this.ws === null || this.readOnly) {
      return
    }
    this.ws.send(JSON.stringify({ e: eventName, d: data }))
  }
}

class SocketConnectionAdapter {
  constructor(_conn) {
    this.conn = _conn
    this.callbacks = null

    this.conn.on('quit', clientId => {
      this.trigger('client_left', clientId)
    })

    this.conn.on('join', data => {
      const clientId = data.id
      const name = data.name
      this.trigger('set_name', clientId, name)
    })

    this.conn.on('ok', () => {
      this.trigger(['ack'])
    })

    this.conn.on('op', data => {
      const clientId = data[0]
      const operation = data[1]
      const selection = data[2]
      this.trigger('operation', operation)
      this.trigger('selection', clientId, selection)
    })

    this.conn.on('sel', data => {
      const clientId = data[0]
      const selection = data[1]
      this.trigger('selection', clientId, selection)
    })

    this.conn.on('reconnect', () => {
      this.trigger('reconnect')
    })
  }

  sendOperation(rev, op, sel) {
    this.conn.send('op', [rev, op, sel])
  }

  sendSelection(sel) {
    this.conn.send('sel', sel)
  }

  registerCallbacks(cb) {
    this.callbacks = cb
  }

  trigger(event) {
    const args = Array.prototype.slice.call(arguments, 1)
    const action = this.callbacks && this.callbacks[event]
    if (action) {
      action.apply(this, args)
    }
  }
}

export { SocketConnection, SocketConnectionAdapter }
