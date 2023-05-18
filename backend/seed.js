const db = require('./models');

const products = [
  {
    name: 'essential oil 1',
    image: 'assets/essentialOil1.png',
    description: 'description',
    size: '15 ml',
    price: 15.88,
  },
  {
    name: 'essential oil 2',
    image: 'assets/essentialOil2.png',
    description: 'description',
    size: '14 ml',
    price: 16.45,
  },
  {
    name: 'essential oil 3',
    image: 'assets/essentialOil3.png',
    description: 'description',
    size: '17 ml',
    price: 17.25,
  },
  {
    name: 'essential oil 4',
    image: 'assets/essentialOil4.png',
    description: 'description',
    size: '15 ml',
    price: 18.33,
  },
  {
    name: 'bodyCare1',
    image: 'assets/bodyCare1.png',
    description: 'description',
    size: '150 ml',
    price: 22.44,
  },
  {
    name: 'bodyCare2',
    image: 'assets/bodyCare2.png',
    description: 'description',
    size: '180 ml',
    price: 23.65,
  },
  {
    name: 'bodyCare3',
    image: 'assets/bodyCare3.png',
    description: 'description',
    size: '200 ml',
    price: 24.74,
  },
  {
    name: 'bodyCare4',
    image: 'assets/bodyCare4.png',
    description: 'description',
    size: '150 ml',
    price: 17.22,
  },
  {
    name: 'bodyCare5',
    image: 'assets/bodyCare5.png',
    description: 'description',
    size: '185 ml',
    price: 24.21,
  },
  {
    name: 'difuser1',
    image: 'assets/difuser1.png',
    description: 'description',
    size: '180 ml',
    price: 150.44,
  },
  {
    name: 'difuser2',
    image: 'assets/difuser2.png',
    description: 'description',
    size: '285 ml',
    price: 111.55,
  },
  {
    name: 'difuser3',
    image: 'assets/difuser3.png',
    description: 'description',
    size: '185 ml',
    price: 132.33,
  },
  {
    name: 'difuser4',
    image: 'assets/difuser4.png',
    description: 'description',
    size: '210 ml',
    price: 90.55,
  },
  {
    name: 'difuser5',
    image: 'assets/difuser5.png',
    description: 'description',
    size: '155 ml',
    price: 80.22,
  },
  {
    name: 'hairCare1',
    image: 'assets/hairCare1.png',
    description: 'description',
    size: '255 ml',
    price: 15,
  },
  {
    name: 'hairCare2',
    image: 'assets/hairCare2.png',
    description: 'description',
    size: '245 ml',
    price: 15,
  },
  {
    name: 'hairCare3',
    image: 'assets/hairCare3.png',
    description: 'description',
    size: '225 ml',
    price: 15,
  },
  {
    name: 'hairCare4',
    image: 'assets/hairCare4.png',
    description: 'description',
    size: '255 ml',
    price: 15,
  },
  {
    name: 'hairCare5',
    image: 'assets/hairCare5.png',
    description: 'description',
    size: '155 ml',
    price: 15,
  },
  {
    name: 'difuser1',
    image: 'assets/12.png',
    description: 'description',
    size: 15,
    price: 15,
  },
  {
    name: 'difuser1',
    image: 'assets/12.png',
    description: 'description',
    size: 15,
    price: 15,
  },

  {
    name: 'difuser1',
    image: 'assets/12.png',
    description: 'description',
    size: 15,
    price: 15,
  },
  {
    name: 'difuser1',
    image: 'assets/12.png',
    description: 'description',
    size: 15,
    price: 15,
  },
  {
    name: 'difuser1',
    image: 'assets/12.png',
    description: 'description',
    size: 15,
    price: 15,
  },
  {
    name: 'difuser1',
    image: 'assets/12.png',
    description: 'description',
    size: 15,
    price: 15,
  },

  {
    name: 'difuser1',
    image: 'assets/12.png',
    description: 'description',
    size: 15,
    price: 15,
  },
  {
    name: 'difuser1',
    image: 'assets/12.png',
    description: 'description',
    size: 15,
    price: 15,
  },
];

async function seed() {
  try {
    await db.sequelize.sync({ force: true });

    await Promise.all(
      products.map((product) => {
        return db.product.create(product);
      })
    );

    console.log('Database seeded!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
