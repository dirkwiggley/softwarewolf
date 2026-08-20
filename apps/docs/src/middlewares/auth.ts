import type { Request, Response, NextFunction } from 'express';
import type { Role } from '../generated/client/index.js';
import prisma from '../db.js';

// Middleware to mock a logged-in user header for local development testing
export const injectMockUser = async (req: Request, res: Response, next: NextFunction) => {
  const mockUserId = req.headers['x-mock-user-id'];

  if (mockUserId && typeof mockUserId === 'string') {
    try {
      const user = await prisma.user.findUnique({ where: { id: mockUserId } });
      if (user) {
        (req as any).user = user; // Attach the full user record to the request object
      }
    } catch (err) {
      // Fail silently and continue
    }
  }
  next();
};

// Strict route guarding middleware factories
export const restrictTo = (...allowedRoles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const currentUser = (req as any).user;

    // 1. If no user is attached, block immediately
    if (!currentUser) {
      res.status(401).json({ error: 'Authentication required to access this endpoint' });
      return;
    }

    // 2. If the user's role is not explicitly authorized in the arguments list, block them
    if (!allowedRoles.includes(currentUser.role)) {
      res.status(403).json({ error: 'Access denied: Insufficient permission clearance' });
      return;
    }

    // 3. User passed the gate! Proceed to the controller logic
    next();
  };
};
