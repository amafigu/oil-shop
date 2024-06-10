import { hashPassword } from '../middleware/passwordEncrypt.js';
import db from '../models/index.js';

const users = [
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'customer1@mail.com',
    password: 'A!123456',
    image: 'https://oylo-images.s3.us-east-2.amazonaws.com/customer1.jpg',
  },
  {
    firstName: 'Penny',
    lastName: 'Lane',
    email: 'customer2@mail.com',
    password: 'A!123456',
    image: 'https://oylo-images.s3.us-east-2.amazonaws.com/customer2.jpg',
  },
  {
    firstName: 'Helen',
    lastName: 'Lopez',
    email: 'customer3@mail.com',
    password: 'A!123456',
    image: 'https://oylo-images.s3.us-east-2.amazonaws.com/customer3.jpg',
  },
  {
    firstName: 'Lin',
    lastName: 'Xiu Rong',
    email: 'customer4@mail.com',
    password: 'A!123456',
    image: 'https://oylo-images.s3.us-east-2.amazonaws.com/customer4.jpg',
  },
  {
    firstName: 'Kamaru',
    lastName: 'Adeleke',
    email: 'customer5@mail.com',
    password: 'A!123456',
    image: 'https://oylo-images.s3.us-east-2.amazonaws.com/customer5.jpg',
  },
  {
    firstName: 'Maria',
    lastName: 'Garcia',
    email: 'customer6@mail.com',
    password: 'A!123456',
    image: 'https://oylo-images.s3.us-east-2.amazonaws.com/customer6.jpg',
  },
  {
    firstName: 'Anthony',
    lastName: 'Smith',
    email: 'customer7@mail.com',
    password: 'A!123456',
    image: 'https://oylo-images.s3.us-east-2.amazonaws.com/customer7.jpg',
  },
  {
    firstName: 'Georgina',
    lastName: 'Benson',
    email: 'customer8@mail.com',
    password: 'A!123456',
    image: 'https://oylo-images.s3.us-east-2.amazonaws.com/customer8.jpg',
  },
  {
    firstName: 'Ella',
    lastName: 'Fritzgerald',
    email: 'customer9@mail.com',
    password: 'A!123456',
    image: 'https://oylo-images.s3.us-east-2.amazonaws.com/customer9.jpg',
  },
];

async function seed() {
  try {
    const customerRole = await db.roles.findOne({
      where: { name: 'customer' },
    });

    if (!customerRole) {
      throw new Error('Customer role not found');
    }

    for (const newUser of users) {
      const hashedPassword = await hashPassword(newUser.password);

      const userWithRoleId = {
        ...newUser,
        password: hashedPassword,
        roleId: customerRole.id,
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
