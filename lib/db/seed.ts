import { db } from './drizzle';
import { users, teams, teamMembers } from './schema';
import { hashPassword } from '@/lib/auth/session';

async function seed() {
  const email = process.env.SEED_ADMIN_EMAIL?.trim();
  const password = process.env.SEED_ADMIN_PASSWORD;
  if (!email || !password || password.length < 16) {
    throw new Error('Set SEED_ADMIN_EMAIL and a unique SEED_ADMIN_PASSWORD of at least 16 characters in your local .env before seeding.');
  }
  const passwordHash = await hashPassword(password);
  const [user] = await db
    .insert(users)
    .values([
      {
        email: email,
        passwordHash: passwordHash,
        role: "admin",
      },
    ])
    .returning();

  console.log('Initial Admin user created.');

  const [team] = await db
    .insert(teams)
    .values({
      name: 'Admin Team',
    })
    .returning();

  await db.insert(teamMembers).values({
    teamId: team.id,
    userId: user.id,
    role: 'owner',
  });

  console.log('Admin team created and linked.');
}

seed()
  .catch((error) => {
    console.error('Seed process failed:', error);
    process.exit(1);
  })
  .finally(() => {
    console.log('Seed process finished. Exiting...');
    process.exit(0);
  });
