const registerChatHandlers = (io, socket) => {
  socket.on('typing-start', ({ projectId, filePath }) => {
    socket.to(`project:${projectId}`).emit('typing-start', {
      user: { id: socket.user.id, username: socket.user.username },
      filePath
    });
  });

  socket.on('typing-stop', ({ projectId }) => {
    socket.to(`project:${projectId}`).emit('typing-stop', {
      userId: socket.user.id
    });
  });

  socket.on('audio-huddle-state', ({ projectId, isMuted, isTalking }) => {
    io.to(`project:${projectId}`).emit('audio-huddle-update', {
      userId: socket.user.id,
      username: socket.user.username,
      isMuted,
      isTalking
    });
  });
};

module.exports = { registerChatHandlers };
