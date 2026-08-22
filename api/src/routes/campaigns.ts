import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from './auth';

const prisma = new PrismaClient();
const router = express.Router();

interface AuthRequest extends Request {
  user?: any;
}

// Get all campaigns
router.get('/:workspaceId/campaigns', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const { status } = req.query;
    const where: any = { workspaceId: req.params.workspaceId };

    if (status) where.status = status;

    const campaigns = await prisma.campaign.findMany({
      where,
      include: { posts: true },
      orderBy: { createdAt: 'desc' },
    });

    res.json(campaigns);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get single campaign
router.get('/:id', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const campaign = await prisma.campaign.findUnique({
      where: { id: req.params.id },
      include: { posts: true },
    });

    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }

    res.json(campaign);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Create campaign
router.post('/:workspaceId/campaigns', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const { name, description, objective, platforms, startDate, endDate, budget } = req.body;

    if (!name || !objective || !platforms) {
      return res.status(400).json({ message: 'Name, objective, and platforms required' });
    }

    const campaign = await prisma.campaign.create({
      data: {
        workspaceId: req.params.workspaceId,
        name,
        description,
        objective,
        platforms,
        status: 'planning',
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        budget,
      },
    });

    res.status(201).json(campaign);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update campaign
router.put('/:id', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const { name, description, objective, platforms, startDate, endDate, budget, status } = req.body;

    const campaign = await prisma.campaign.update({
      where: { id: req.params.id },
      data: { name, description, objective, platforms, startDate, endDate, budget, status },
    });

    res.json(campaign);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete campaign
router.delete('/:id', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    await prisma.campaign.delete({ where: { id: req.params.id } });
    res.json({ message: 'Campaign deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Publish campaign
router.post('/:id/publish', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const campaign = await prisma.campaign.update({
      where: { id: req.params.id },
      data: { status: 'active' },
    });

    res.json(campaign);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Pause campaign
router.post('/:id/pause', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const campaign = await prisma.campaign.update({
      where: { id: req.params.id },
      data: { status: 'paused' },
    });

    res.json(campaign);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
