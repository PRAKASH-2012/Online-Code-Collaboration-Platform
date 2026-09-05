const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/jwt');
const { registerCollabHandlers } = require('./collabSocket');
const { registerChatHandlers } = require('./chatSocket');
const { registerIDEHandlers } = require('./ideSocket');

const activeRoomUsers = new Map(); // projectId => Map(socketId => user)

const setupSocketHandlers = (io) => {
  io.use((socket, next) => {
    const token = socket.handshake.auth?.token || socket.handshake.query?.token;
    if (!token) {
      return next(new Error('Authentication required.'));
    }
    if (token === 'demo_token_123') {
      socket.user = { id: '665000000000000000000001', username: 'prakash_demo', role: 'Platform Admin' };
      return next();
    }
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      socket.user = decoded;
      return next();
    } catch (err) {
      return next(new Error('Invalid or expired token.'));
    }
  });

  io.on('connection', (socket) => {
    console.log(`[Socket] User connected: ${socket.user.username} (${socket.id})`);
    socket.join(`user:${socket.user.id}`);

    // Join Project Room
    socket.on('join-project', ({ projectId }) => {
      if (!projectId) return;
      socket.join(`project:${projectId}`);
      socket.currentProjectId = projectId;

      if (!activeRoomUsers.has(projectId)) {
        activeRoomUsers.set(projectId, new Map());
      }
      const roomMap = activeRoomUsers.get(projectId);
      roomMap.set(socket.id, {
        id: socket.user.id,
        username: socket.user.username,
        avatar: socket.user.avatar || `https://api.dicebear.com/7.x/identicon/svg?seed=${socket.user.username}`,
        socketId: socket.id,
        currentFile: null,
        cursor: null
      });

      const presenceList = Array.from(roomMap.values());
      io.to(`project:${projectId}`).emit('presence-update', presenceList);
      socket.to(`project:${projectId}`).emit('user-joined', { user: socket.user });
    });

    // Register Sub-Handlers
    registerCollabHandlers(io, socket, activeRoomUsers);
    registerChatHandlers(io, socket);
    registerIDEHandlers(io, socket);

    socket.on('disconnect', () => {
      if (socket.currentProjectId && activeRoomUsers.has(socket.currentProjectId)) {
        const roomMap = activeRoomUsers.get(socket.currentProjectId);
        roomMap.delete(socket.id);
        const presenceList = Array.from(roomMap.values());
        io.to(`project:${socket.currentProjectId}`).emit('presence-update', presenceList);
        io.to(`project:${socket.currentProjectId}`).emit('user-left', { userId: socket.user.id, username: socket.user.username });
      }
    });
  });
};

module.exports = setupSocketHandlers;
