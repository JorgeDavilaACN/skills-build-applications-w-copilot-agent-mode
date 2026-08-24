import mongoose from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from '../models/index.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.create([
      { username: 'maya-chen', email: 'maya.chen@example.com', displayName: 'Maya Chen' },
      { username: 'noah-williams', email: 'noah.williams@example.com', displayName: 'Noah Williams' },
      { username: 'sofia-patel', email: 'sofia.patel@example.com', displayName: 'Sofia Patel' },
      { username: 'liam-rodriguez', email: 'liam.rodriguez@example.com', displayName: 'Liam Rodriguez' },
    ]);

    const teams = await Team.create([
      {
        name: 'Trail Blazers',
        description: 'Weekend runners building steady endurance together.',
        memberIds: [users[0]._id, users[1]._id],
      },
      {
        name: 'Core Crew',
        description: 'A balanced team focused on strength and mobility.',
        memberIds: [users[2]._id, users[3]._id],
      },
    ]);

    await User.bulkWrite([
      { updateOne: { filter: { _id: users[0]._id }, update: { teamId: teams[0]._id } } },
      { updateOne: { filter: { _id: users[1]._id }, update: { teamId: teams[0]._id } } },
      { updateOne: { filter: { _id: users[2]._id }, update: { teamId: teams[1]._id } } },
      { updateOne: { filter: { _id: users[3]._id }, update: { teamId: teams[1]._id } } },
    ]);

    await Activity.create([
      { userId: users[0]._id, type: 'Running', durationMinutes: 35, points: 70, completedAt: new Date('2026-08-20') },
      { userId: users[1]._id, type: 'Cycling', durationMinutes: 45, points: 90, completedAt: new Date('2026-08-21') },
      { userId: users[2]._id, type: 'Strength training', durationMinutes: 30, points: 75, completedAt: new Date('2026-08-22') },
      { userId: users[3]._id, type: 'Yoga', durationMinutes: 25, points: 50, completedAt: new Date('2026-08-23') },
    ]);

    await Leaderboard.create([
      { userId: users[1]._id, teamId: teams[0]._id, points: 320, rank: 1 },
      { userId: users[0]._id, teamId: teams[0]._id, points: 285, rank: 2 },
      { userId: users[2]._id, teamId: teams[1]._id, points: 260, rank: 3 },
      { userId: users[3]._id, teamId: teams[1]._id, points: 215, rank: 4 },
    ]);

    await Workout.create([
      {
        name: 'Morning Momentum',
        description: 'A short full-body session to start the day.',
        difficulty: 'beginner',
        durationMinutes: 20,
        exercises: ['Bodyweight squats', 'Push-ups', 'Plank', 'Jumping jacks'],
      },
      {
        name: 'Runner Strength',
        description: 'Build lower-body power and stability for your next run.',
        difficulty: 'intermediate',
        durationMinutes: 35,
        exercises: ['Reverse lunges', 'Single-leg deadlift', 'Glute bridge', 'Calf raises'],
      },
      {
        name: 'Power Circuit',
        description: 'A challenging circuit for experienced athletes.',
        difficulty: 'advanced',
        durationMinutes: 45,
        exercises: ['Burpees', 'Mountain climbers', 'Thrusters', 'Bear crawl'],
      },
    ]);

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
