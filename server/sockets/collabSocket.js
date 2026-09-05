const registerCollabHandlers = (io, socket, activeRoomUsers) => {
  // Live Code Change Sync
  socket.on('code-change', ({ projectId, filePath, content, changes, senderId }) => {
    socket.to(`project:${projectId}`).emit('code-change', {
      filePath,
      content,
      changes,
      senderId: senderId || socket.user.id
    });
  });

  // Collaborative Cursor & Selection Updates
  socket.on('cursor-update', ({ projectId, filePath, cursor, selection }) => {
    if (socket.currentProjectId && activeRoomUsers.has(projectId)) {
      const roomMap = activeRoomUsers.get(projectId);
      if (roomMap.has(socket.id)) {
        const u = roomMap.get(socket.id);
        u.currentFile = filePath;
        u.cursor = cursor;
        u.selection = selection;
      }
    }

    socket.to(`project:${projectId}`).emit('cursor-update', {
      userId: socket.user.id,
      username: socket.user.username,
      socketId: socket.id,
      filePath,
      cursor,
      selection
    });
  });

  // Follow Mode Sync
  socket.on('follow-user-position', ({ projectId, targetUserId, filePath, cursor, scrollLine }) => {
    socket.to(`project:${projectId}`).emit('follow-sync-update', {
      targetUserId,
      filePath,
      cursor,
      scrollLine
    });
  });

  // Heatmap line edit trigger
  socket.on('line-edited', ({ projectId, filePath, lineNumber }) => {
    io.to(`project:${projectId}`).emit('heatmap-activity', { filePath, lineNumber, count: 1 });
  });
};

module.exports = { registerCollabHandlers };
