import { io } from 'socket.io-client';

let socket = null;

export const initSocket = (token) => {
  if (socket) return socket;
  socket = io(window.location.origin, {
    auth: { token: token || localStorage.getItem('codesync_token') },
    transports: ['websocket', 'polling']
  });
  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
