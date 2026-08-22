import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from './auth';

const prisma = new PrismaClient();
const router = express.Router();

interface AuthRequest extends Request {
  user?: any;
}

// Get all messages
router.get('/:workspaceId/messages', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const { status } = req.query;
    const where: any = { workspaceId: req.params.workspaceId };

    if (status) where.status = status;

    const messages = await prisma.message.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: 100,
    });

    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get conversation
router.get('/conversation/:conversationId', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const messages = await prisma.message.findMany({
      where: { conversationId: req.params.conversationId },
      orderBy: { createdAt: 'asc' },
    });

    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Send message
router.post('/:workspaceId/messages', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const { conversationId, text, platform } = req.body;

    const message = await prisma.message.create({
      data: {
        workspaceId: req.params.workspaceId,
        conversationId,
        senderId: req.user.id,
        senderName: 'You',
        text,
        platform,
        status: 'sent',
      },
    });

    res.status(201).json(message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Mark as read
router.put('/:id/read', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const message = await prisma.message.update({
      where: { id: req.params.id },
      data: { status: 'read' },
    });

    res.json(message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
