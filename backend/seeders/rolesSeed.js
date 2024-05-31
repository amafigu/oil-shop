import db from '../models/index.js';

const roles = [
  {
    name: 'admin',
  },
  {
    name: 'customer',
  },
];

async function seed() {
  try {
    for (const role of roles) {
      const existingRole = await db.roles.findOne({
        where: { name: role.name },
      });
      if (!existingRole) {
        await db.roles.create(role);
      }
    }
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
