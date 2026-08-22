import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from './auth';

const prisma = new PrismaClient();
const router = express.Router();

interface AuthRequest extends Request {
  user?: any;
}

// Get all workspaces for user
router.get('/', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const workspaces = await prisma.workspace.findMany({
      where: {
        members: {
          some: { userId: req.user.id },
        },
      },
      include: {
        owner: true,
        members: true,
      },
    });

    res.json(workspaces);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get single workspace
router.get('/:id', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const workspace = await prisma.workspace.findUnique({
      where: { id: req.params.id },
      include: {
        owner: true,
        members: {
          include: { user: true },
        },
      },
    });

    if (!workspace) {
      return res.status(404).json({ message: 'Workspace not found' });
    }

    // Check if user is member
    const isMember = workspace.members.some(m => m.userId === req.user.id);
    if (!isMember) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(workspace);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Create workspace
router.post('/', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const { name, slug, description } = req.body;

    if (!name || !slug) {
      return res.status(400).json({ message: 'Name and slug required' });
    }

    const workspace = await prisma.workspace.create({
      data: {
        name,
        slug,
        ownerId: req.user.id,
        currency: 'USD',
        timezone: 'UTC',
      },
    });

    // Add creator as owner
    await prisma.workspaceMember.create({
      data: {
        workspaceId: workspace.id,
        userId: req.user.id,
        role: 'owner',
      },
    });

    res.status(201).json(workspace);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update workspace
router.put('/:id', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const { name, slug, currency, timezone } = req.body;

    const workspace = await prisma.workspace.findUnique({
      where: { id: req.params.id },
      include: { members: true },
    });

    if (!workspace) {
      return res.status(404).json({ message: 'Workspace not found' });
    }

    // Check if user is owner
    const member = workspace.members.find(m => m.userId === req.user.id);
    if (!member || member.role !== 'owner') {
      return res.status(403).json({ message: 'Only owner can update' });
    }

    const updated = await prisma.workspace.update({
      where: { id: req.params.id },
      data: { name, slug, currency, timezone },
    });

    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get workspace members
router.get('/:id/members', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const members = await prisma.workspaceMember.findMany({
      where: { workspaceId: req.params.id },
      include: { user: true },
    });

    res.json(members);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Invite member
router.post('/:id/members/invite', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const { email, role } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const member = await prisma.workspaceMember.create({
      data: {
        workspaceId: req.params.id,
        userId: user.id,
        role: role || 'member',
      },
    });

    res.status(201).json(member);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update member role
router.put('/:id/members/:memberId', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const { role } = req.body;

    const member = await prisma.workspaceMember.update({
      where: { id: req.params.memberId },
      data: { role },
    });

    res.json(member);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Remove member
router.delete('/:id/members/:memberId', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    await prisma.workspaceMember.delete({
      where: { id: req.params.memberId },
    });

    res.json({ message: 'Member removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
