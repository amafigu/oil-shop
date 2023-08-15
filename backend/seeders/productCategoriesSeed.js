import db from '../models/index.js';

const productCategories = [
  {
    name: 'roll',
  },
  {
    name: 'all',
  },
  {
    name: 'essentialOil',
  },
  {
    name: 'bodyCare',
  },
  {
    name: 'difuser',
  },
  {
    name: 'massageOil',
  },
];

async function seed() {
  try {
    for (const newCategory of productCategories) {
      const existingCategory = await db.productCategory.findOne({
        where: { name: newCategory.name },
      });
      if (!existingCategory) {
        await db.productCategory.create(newCategory);
      }
    }
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
