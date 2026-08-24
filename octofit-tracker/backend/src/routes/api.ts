import { Router } from 'express';
import { Activity, Leaderboard, Team, User, Workout } from '../models/index.js';

function createResourceRouter(model: typeof User) {
  const router = Router();

  router.get('/', async (_request, response) => {
    try {
      response.json(await model.find().lean());
    } catch (error) {
      response.status(503).json({ error: 'Database unavailable', details: String(error) });
    }
  });

  router.post('/', async (request, response) => {
    try {
      const resource = await model.create(request.body);
      response.status(201).json(resource);
    } catch (error) {
      response.status(400).json({ error: 'Invalid resource', details: String(error) });
    }
  });

  return router;
}

export const usersRouter = createResourceRouter(User);
export const teamsRouter = createResourceRouter(Team);
export const activitiesRouter = createResourceRouter(Activity);
export const leaderboardRouter = createResourceRouter(Leaderboard);
export const workoutsRouter = createResourceRouter(Workout);