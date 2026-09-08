import type { Request, Response } from 'express';
import prisma from '../db.js';

// Get all articles sorted by custom sort index
export const getNewsArticles = async (req: Request, res: Response) => {
  try {
    const articles = await prisma.newsArticle.findMany({
      orderBy: { sortOrder: 'asc' },
    });
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch news articles' });
  }
};

// Create a new article record
export const createNewsArticle = async (req: Request, res: Response) => {
  try {
    const { title, author, sections, button, sortOrder, insertBreakAfter } = req.body;
    
    const newArticle = await prisma.newsArticle.create({
      data: {
        title,
        author,
        sections, // Stored directly as a MariaDB JSON array
        button,   // Optional JSON object or null
        sortOrder: Number(sortOrder) || 0,
        insertBreakAfter: Boolean(insertBreakAfter),
      },
    });
    res.status(201).json(newArticle);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create news article' });
  }
};

// Update an existing article record
export const updateNewsArticle = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    // Type defense: ensure id is a valid single string parameter
    if (!id || typeof id !== 'string') {
      res.status(400).json({ error: 'A valid individual string ID parameter is required' });
      return;
    }

    const { title, author, sections, button, sortOrder, insertBreakAfter } = req.body;

    const updatedArticle = await prisma.newsArticle.update({
      where: { id }, // TypeScript is now 100% happy because 'id' is guaranteed to be a string
      data: {
        title,
        author,
        sections,
        button,
        sortOrder: Number(sortOrder),
        insertBreakAfter: Boolean(insertBreakAfter),
      },
    });
    res.status(200).json(updatedArticle);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update news article' });
  }
};

// Delete an existing article record out of the database matrix
export const deleteNewsArticle = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id || typeof id !== 'string') {
      res.status(400).json({ error: 'A valid individual string ID parameter is required' });
      return;
    }

    await prisma.newsArticle.delete({
      where: { id },
    });

    res.status(200).json({ success: true, message: 'Chronicle record purged successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to purge news article configuration' });
  }
};
