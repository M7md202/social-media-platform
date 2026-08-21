import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import http from 'http';

dotenv.config();

const app: Express = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes (to be implemented)
app.use('/api/auth', (req: Request, res: Response) => {
  res.json({ message: 'Auth routes coming soon' });
});

app.use('/api/users', (req: Request, res: Response) => {
  res.json({ message: 'Users routes coming soon' });
});

app.use('/api/workspaces', (req: Request, res: Response) => {
  res.json({ message: 'Workspaces routes coming soon' });
});

app.use('/api/social-accounts', (req: Request, res: Response) => {
  res.json({ message: 'Social accounts routes coming soon' });
});

app.use('/api/posts', (req: Request, res: Response) => {
  res.json({ message: 'Posts routes coming soon' });
});

app.use('/api/campaigns', (req: Request, res: Response) => {
  res.json({ message: 'Campaigns routes coming soon' });
});

app.use('/api/analytics', (req: Request, res: Response) => {
  res.json({ message: 'Analytics routes coming soon' });
});

app.use('/api/automations', (req: Request, res: Response) => {
  res.json({ message: 'Automations routes coming soon' });
});

app.use('/api/messages', (req: Request, res: Response) => {
  res.json({ message: 'Messages routes coming soon' });
});

app.use('/api/leads', (req: Request, res: Response) => {
  res.json({ message: 'Leads routes coming soon' });
});

// Socket.io events
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handler
app.use((err: any, req: Request, res: Response) => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
});

server.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📊 Client URL: ${process.env.CLIENT_URL || 'http://localhost:3000'}`);
});

export { app, server, io };
