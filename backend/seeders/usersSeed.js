import db from '../models/index.js';

const users = [
  {
    firstName: 'Admin',
    lastName: 'One',
    email: 'adminone@mail.com',
    password: '123456789',
    role: 'admin',
  },
  {
    firstName: 'Admin',
    lastName: 'Two',
    email: 'admintwo@mail.com',
    password: '123456789',
    role: 'admin',
  },

  {
    firstName: 'Guest',
    lastName: 'Two',
    email: 'guesttwo@mail.com',
    password: '123456789',
    role: 'guest',
  },
  {
    firstName: 'Guest',
    lastName: 'One',
    email: 'guestone@mail.com',
    password: '123456789',
    role: 'guest',
  },
];

async function seed() {
  try {
    for (const newUser of users) {
      const existingUser = await db.user.findOne({
        where: { email: newUser.email },
      });
      if (!existingUser) {
        await db.user.create(newUser);
      }
    }
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
