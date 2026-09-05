require('dotenv').config();
const path = require('path');
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const { apiLimiter } = require('./middleware/rateLimiter');
const setupSocketHandlers = require('./sockets/socketHandler');
const { initSocketService } = require('./services/socketService');

// Route Imports
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');
const fileRoutes = require('./routes/fileRoutes');
const executionRoutes = require('./routes/executionRoutes');
const aiRoutes = require('./routes/aiRoutes');
const messageRoutes = require('./routes/messageRoutes');
const commentRoutes = require('./routes/commentRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const taskRoutes = require('./routes/taskRoutes');
const orgRoutes = require('./routes/orgRoutes');
const versionRoutes = require('./routes/versionRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const adminRoutes = require('./routes/adminRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const githubRoutes = require('./routes/githubRoutes');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }
});

// Middleware Configuration
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({ origin: '*' }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use('/api', apiLimiter);

// Socket Service Setup
initSocketService(io);
setupSocketHandlers(io);

// Health Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    system: 'CodeSync AI Intelligent Platform Backend',
    timestamp: new Date().toISOString(),
    theme: 'Black & Gold',
    nodeVersion: process.version
  });
});

// Register API Groups
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/files', fileRoutes);
app.use('/api/executions', executionRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/orgs', orgRoutes);
app.use('/api/versions', versionRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/github', githubRoutes);

// Serve the built React app from the same origin as the API and sockets.
const frontendDirectory = path.resolve(__dirname, '../dist');
app.use(express.static(frontendDirectory));
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api') || req.path.startsWith('/socket.io')) {
    return next();
  }

  res.sendFile(path.join(frontendDirectory, 'index.html'), (error) => {
    if (error) next();
  });
});

// Centralized Error Handler
app.use(errorHandler);

const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 5000;

const startServer = (port) => {
  server.listen(port, () => {
    console.log(`=======================================================`);
    console.log(`[CodeSync AI] Express & Socket.IO Backend Running!`);
    console.log(`[URL] http://localhost:${port}`);
    console.log(`[Theme] Black & Gold Developer Platform Ready`);
    console.log(`=======================================================`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.warn(`[Port ${port} Busy] Attempting fallback port ${port + 1}...`);
      startServer(port + 1);
    } else {
      console.error('[Server Error]', err);
    }
  });
};

connectDB().then(() => {
  startServer(DEFAULT_PORT);
});
