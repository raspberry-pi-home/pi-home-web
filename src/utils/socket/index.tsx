import io from 'socket.io-client'

let socket: any | null

export const initiateSocket = (uri: string): void => {
  socket = io(uri)
}

export const disconnectSocket = (): void => {
  if (socket) {
    socket.disconnect()
  }
}

export const subscribeTo = (eventName: string, callback: (data: any) => void): void => {
  if (socket) {
    socket.on(eventName, (data: any) => {
      callback(data)
    })
  }
}

export const sendData = (eventName: string, data: any): void => {
  if (socket) {
    socket.emit(eventName, data)
  }
}
