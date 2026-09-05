const registerIDEHandlers = (io, socket) => {
  socket.on('file-created-event', ({ projectId, file }) => {
    socket.to(`project:${projectId}`).emit('file-created-event', file);
  });

  socket.on('file-deleted-event', ({ projectId, fileId, filePath }) => {
    socket.to(`project:${projectId}`).emit('file-deleted-event', { fileId, filePath });
  });

  socket.on('task-updated-event', ({ projectId, task }) => {
    io.to(`project:${projectId}`).emit('task-updated-event', task);
  });

  socket.on('comment-created-event', ({ projectId, comment }) => {
    io.to(`project:${projectId}`).emit('comment-created-event', comment);
  });
};

module.exports = { registerIDEHandlers };
