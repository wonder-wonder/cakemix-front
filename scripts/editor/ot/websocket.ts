// Not complete

const EventEmitter = require('events')

class SocketConnection extends EventEmitter {
  url: string
  ws: WebSocket | null

  constructor(private _url: string) {
    super()

    this.url = _url
    this.ws = new WebSocket(_url)

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

  close() {
    if (this.ws === null) {
      return
    }
    this.ws.close()
  }

  send(eventName: string, data: any) {
    console.log(data)

    if (this.ws === null) {
      return
    }
    this.ws.send(JSON.stringify({ e: eventName, d: data }))
  }
}

class SocketConnectionAdapter {
  conn: any
  callbacks: any | null

  constructor(private _conn: any) {
    this.conn = _conn
    this.callbacks = null

    this.conn.on('quit', (clientId: string) => {
      this.trigger(['client_left', clientId])
    })

    this.conn.on('join', (data: { [key: string]: any }) => {
      console.log(data)

      const clientId = data.client_id
      const name = data.username
      this.trigger(['set_name', clientId, name])
    })

    this.conn.on('ok', () => {
      this.trigger(['ack'])
    })

    this.conn.on('op', (data: Array<any>) => {
      const clientId = data[0]
      const operation = data[1]
      const selection = data[2]
      this.trigger(['operation', operation])
      this.trigger(['selection', clientId, selection])
    })

    this.conn.on('sel', (data: Array<any>) => {
      const clientId = data[0]
      const selection = data[1]
      this.trigger(['selection', clientId, selection])
    })

    this.conn.on('reconnect', () => {
      this.trigger(['reconnect'])
    })
  }

  sendOperation(rev: any, op: any, sel: any) {
    this.conn.send(['op', rev, op, sel])
  }

  sendSelection(sel: any) {
    this.conn.send(['sel', sel])
  }

  registerCallbacks(cb: Function) {
    this.callbacks = cb
  }

  trigger(event: Array<any>) {
    console.log(event)

    const args = event.slice(1)
    const action = this.callbacks && this.callbacks[event[0]]
    if (action) {
      action.apply(this, args)
    }
  }
}

export { SocketConnection, SocketConnectionAdapter }
