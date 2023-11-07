import db from '../models/index.js';

const productCategories = [
  {
    name: 'roll',
  },
  {
    name: 'all',
  },
  {
    name: 'essential_oil',
  },
  {
    name: 'body_care',
  },
  {
    name: 'difuser',
  },
  {
    name: 'massage_oil',
  },
];

async function seed() {
  try {
    for (const newCategory of productCategories) {
      const existingCategory = await db.productCategories.findOne({
        where: { name: newCategory.name },
      });
      if (!existingCategory) {
        await db.productCategories.create(newCategory);
      }
    }
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
