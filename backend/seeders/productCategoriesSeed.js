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
    await db.sequelize.sync({ force: true });

    await Promise.all(
      productCategories.map((newCategory) => {
        return db.productCategory.create(newCategory);
      })
    );

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
