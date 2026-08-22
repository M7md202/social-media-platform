import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

// Load environment variables
dotenv.config();

// Import routes
import authRoutes from './routes/auth';
import workspaceRoutes from './routes/workspaces';
import socialAccountRoutes from './routes/socialAccounts';
import postRoutes from './routes/posts';
import campaignRoutes from './routes/campaigns';
import analyticsRoutes from './routes/analytics';
import messageRoutes from './routes/messages';
import leadRoutes from './routes/leads';
import automationRoutes from './routes/automations';

const app = express();
const prisma = new PrismaClient();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/workspaces', workspaceRoutes);
app.use('/api/workspaces', socialAccountRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/automations', automationRoutes);

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

// 404 handler
app.use((req: express.Request, res: express.Response) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start server
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 API endpoint: http://localhost:${PORT}/api`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

export default app;
