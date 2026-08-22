import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from './auth';

const prisma = new PrismaClient();
const router = express.Router();

interface AuthRequest extends Request {
  user?: any;
}

// Get all leads
router.get('/:workspaceId/leads', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const { status } = req.query;
    const where: any = { workspaceId: req.params.workspaceId };

    if (status) where.status = status;

    const leads = await prisma.lead.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    res.json(leads);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get single lead
router.get('/:id', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const lead = await prisma.lead.findUnique({
      where: { id: req.params.id },
    });

    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    res.json(lead);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Create lead
router.post('/:workspaceId/leads', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const { firstName, lastName, email, phone, company, position, source } = req.body;

    if (!firstName || !source) {
      return res.status(400).json({ message: 'First name and source required' });
    }

    const lead = await prisma.lead.create({
      data: {
        workspaceId: req.params.workspaceId,
        firstName,
        lastName,
        email,
        phone,
        company,
        position,
        source,
        status: 'new',
      },
    });

    res.status(201).json(lead);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update lead
router.put('/:id', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const { status, tags, notes } = req.body;

    const lead = await prisma.lead.update({
      where: { id: req.params.id },
      data: { status, tags, notes },
    });

    res.json(lead);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete lead
router.delete('/:id', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    await prisma.lead.delete({ where: { id: req.params.id } });
    res.json({ message: 'Lead deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
