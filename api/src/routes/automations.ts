import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from './auth';

const prisma = new PrismaClient();
const router = express.Router();

interface AuthRequest extends Request {
  user?: any;
}

// Get all automations
router.get('/:workspaceId/automations', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const automations = await prisma.automation.findMany({
      where: { workspaceId: req.params.workspaceId },
      orderBy: { createdAt: 'desc' },
    });

    res.json(automations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get single automation
router.get('/:id', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const automation = await prisma.automation.findUnique({
      where: { id: req.params.id },
    });

    if (!automation) {
      return res.status(404).json({ message: 'Automation not found' });
    }

    res.json(automation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Create automation
router.post('/:workspaceId/automations', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const { name, description, type, workflow } = req.body;

    if (!name || !type || !workflow) {
      return res.status(400).json({ message: 'Name, type, and workflow required' });
    }

    const automation = await prisma.automation.create({
      data: {
        workspaceId: req.params.workspaceId,
        name,
        description,
        type,
        status: 'active',
        workflow,
      },
    });

    res.status(201).json(automation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update automation
router.put('/:id', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const { name, description, type, workflow, status } = req.body;

    const automation = await prisma.automation.update({
      where: { id: req.params.id },
      data: { name, description, type, workflow, status },
    });

    res.json(automation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete automation
router.delete('/:id', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    await prisma.automation.delete({ where: { id: req.params.id } });
    res.json({ message: 'Automation deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Toggle automation status
router.post('/:id/toggle', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const automation = await prisma.automation.findUnique({ where: { id: req.params.id } });

    if (!automation) {
      return res.status(404).json({ message: 'Automation not found' });
    }

    const updated = await prisma.automation.update({
      where: { id: req.params.id },
      data: { status: automation.status === 'active' ? 'paused' : 'active' },
    });

    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
