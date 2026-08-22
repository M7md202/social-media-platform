import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from './auth';

const prisma = new PrismaClient();
const router = express.Router();

interface AuthRequest extends Request {
  user?: any;
}

// Get all social accounts for workspace
router.get('/workspace/:workspaceId/accounts', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const accounts = await prisma.socialAccount.findMany({
      where: { workspaceId: req.params.workspaceId },
    });

    res.json(accounts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get single account
router.get('/:id', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const account = await prisma.socialAccount.findUnique({
      where: { id: req.params.id },
    });

    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }

    res.json(account);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Connect account
router.post('/:workspaceId/connect', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const { platform, platformId, username, displayName, accessToken, refreshToken } = req.body;

    const account = await prisma.socialAccount.create({
      data: {
        workspaceId: req.params.workspaceId,
        platform,
        platformId,
        username,
        displayName,
        accessToken,
        refreshToken,
        isConnected: true,
        connectedAt: new Date(),
      },
    });

    res.status(201).json(account);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Disconnect account
router.delete('/:id', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    await prisma.socialAccount.delete({
      where: { id: req.params.id },
    });

    res.json({ message: 'Account disconnected' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Sync account data
router.post('/:id/sync', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    // This would call the actual platform APIs to sync data
    // For now, just return success
    res.json({ message: 'Account synced successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
