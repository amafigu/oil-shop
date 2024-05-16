import { hashPassword } from '../middleware/passwordEncrypt.js';
import db from '../models/index.js';

const users = [
  {
    firstName: 'Amara',
    lastName: 'Salif',
    email: 'admin1@mail.com',
    password: 'A!111111',
    image: 'https://oylo-images.s3.us-east-2.amazonaws.com/admin1.jpg',
  },
  {
    firstName: 'Jenisse',
    lastName: 'Gomez',
    email: 'admin2@mail.com',
    password: 'A!111111',
    image: 'https://oylo-images.s3.us-east-2.amazonaws.com/admin2.jpg',
  },
];

async function seed() {
  try {
    const adminRole = await db.userRoles.findOne({
      where: { name: 'admin' },
    });

    if (!adminRole) {
      throw new Error('Admin role not found');
    }

    for (const newUser of users) {
      const hashedPassword = await hashPassword(newUser.password);

      const userWithRoleId = {
        ...newUser,
        password: hashedPassword,
        roleId: adminRole.id,
      };

      const existingUser = await db.users.findOne({
        where: { email: newUser.email },
      });

      if (!existingUser) {
        await db.users.create(userWithRoleId);
      }
    }

    console.log('Seeding completed successfully.');
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
}

seed();
