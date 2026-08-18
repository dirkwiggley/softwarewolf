import type { Request, Response } from 'express';
import type { HealthResponse, ActivityItem, AddItemRequest } from '@repo/types';

// Live in-memory data store array
const activitiesLog: ActivityItem[] = [
  { id: '1', title: 'System Initialization Profile Booted', createdAt: Date.now() }
];

export const getSystemHealth = (req: Request, res: Response<HealthResponse>) => {
  res.status(200).json({
    status: 'OK',
    message: 'Data processed through the Express Controller successfully!'
  });
};

// GET Controller to fetch the list array items
export const getActivities = (req: Request, res: Response<ActivityItem[]>) => {
  res.status(200).json(activitiesLog);
};

// POST Controller to push and push state alterations into our array
export const createActivity = (req: Request<unknown, unknown, AddItemRequest>, res: Response<ActivityItem>) => {
  const { title } = req.body;
  
  if (!title) {
    res.status(400).end();
    return;
  }

  const newItem: ActivityItem = {
    id: Math.random().toString(36).substring(2, 9),
    title,
    createdAt: Date.now()
  };

  activitiesLog.push(newItem);
  res.status(201).json(newItem);
};
