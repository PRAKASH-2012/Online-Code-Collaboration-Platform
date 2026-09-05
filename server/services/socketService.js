let ioInstance = null;

const initSocketService = (io) => {
  ioInstance = io;
};

const emitToProjectRoom = (projectId, eventName, payload) => {
  if (ioInstance) {
    ioInstance.to(`project:${projectId}`).emit(eventName, payload);
  }
};

const emitToUser = (userId, eventName, payload) => {
  if (ioInstance) {
    ioInstance.to(`user:${userId}`).emit(eventName, payload);
  }
};

module.exports = {
  initSocketService,
  emitToProjectRoom,
  emitToUser
};
