import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from './auth';

const prisma = new PrismaClient();
const router = express.Router();

interface AuthRequest extends Request {
  user?: any;
}

// Get all posts
router.get('/workspace/:workspaceId/posts', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const { status, platform } = req.query;
    const where: any = { workspaceId: req.params.workspaceId };

    if (status) where.status = status;
    if (platform) where.platforms = { has: platform };

    const posts = await prisma.post.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: 50,
    });

    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get single post
router.get('/:id', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const post = await prisma.post.findUnique({
      where: { id: req.params.id },
    });

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Create post
router.post('/:workspaceId/posts', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const { title, content, platforms, scheduledAt, media } = req.body;

    if (!content || !platforms || platforms.length === 0) {
      return res.status(400).json({ message: 'Content and platforms required' });
    }

    const post = await prisma.post.create({
      data: {
        workspaceId: req.params.workspaceId,
        title,
        content,
        platforms,
        status: scheduledAt ? 'scheduled' : 'draft',
        scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
        media: media || [],
      },
    });

    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update post
router.put('/:id', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const { title, content, platforms, scheduledAt } = req.body;

    const post = await prisma.post.update({
      where: { id: req.params.id },
      data: { title, content, platforms, scheduledAt },
    });

    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete post
router.delete('/:id', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    await prisma.post.delete({ where: { id: req.params.id } });
    res.json({ message: 'Post deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Publish post
router.post('/:id/publish', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const post = await prisma.post.update({
      where: { id: req.params.id },
      data: {
        status: 'published',
        publishedAt: new Date(),
      },
    });

    // TODO: Actually publish to platforms

    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Schedule post
router.post('/:id/schedule', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const { scheduledAt } = req.body;

    const post = await prisma.post.update({
      where: { id: req.params.id },
      data: {
        status: 'scheduled',
        scheduledAt: new Date(scheduledAt),
      },
    });

    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
