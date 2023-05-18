const db = require('./models');

const products = [
  {
    name: 'essential oil 1',
    image: 'assets/essentialOil1.png',
    description: 'description',
    size: 15,
    measure: 'ml',
    price: 15.88,
    category: 'essentialOil',
  },
  {
    name: 'essential oil 2',
    image: 'assets/essentialOil2.png',
    description: 'description',
    size: 14,
    measure: 'ml',
    price: 16.45,
    category: 'essentialOil',
  },
  {
    name: 'essential oil 3',
    image: 'assets/essentialOil3.png',
    description: 'description',
    size: 17,
    measure: 'ml',
    price: 17.25,
    category: 'essentialOil',
  },
  {
    name: 'essential oil 4',
    image: 'assets/essentialOil4.png',
    description: 'description',
    size: 15,
    measure: 'ml',
    price: 18.33,
    category: 'essentialOil',
  },
  {
    name: 'bodyCare1',
    image: 'assets/bodyCare1.png',
    description: 'description',
    size: 150,
    measure: 'ml',
    price: 22.44,
    category: 'bodyCare',
  },
  {
    name: 'bodyCare2',
    image: 'assets/bodyCare2.png',
    description: 'description',
    size: 180,
    measure: 'ml',
    price: 23.65,
    category: 'bodyCare',
  },
  {
    name: 'bodyCare3',
    image: 'assets/bodyCare3.png',
    description: 'description',
    size: 200,
    measure: 'ml',
    price: 24.74,
    category: 'bodyCare',
  },
  {
    name: 'bodyCare4',
    image: 'assets/bodyCare4.png',
    description: 'description',
    size: 150,
    measure: 'ml',
    price: 17.22,
    category: 'bodyCare',
  },
  {
    name: 'bodyCare5',
    image: 'assets/bodyCare5.png',
    description: 'description',
    size: 185,
    measure: 'ml',
    price: 24.21,
    category: 'bodyCare',
  },
  {
    name: 'difuser1',
    image: 'assets/difuser1.png',
    description: 'description',
    size: 180,
    measure: 'ml',
    price: 150.44,
    category: 'difuser',
  },
  {
    name: 'difuser2',
    image: 'assets/difuser2.png',
    description: 'description',
    size: 285,
    measure: 'ml',
    price: 111.55,
    category: 'difuser',
  },
  {
    name: 'difuser3',
    image: 'assets/difuser3.png',
    description: 'description',
    size: 185,
    measure: 'ml',
    price: 132.33,
    category: 'difuser',
  },
  {
    name: 'difuser4',
    image: 'assets/difuser4.png',
    description: 'description',
    size: 210,
    measure: 'ml',
    price: 90.55,
    category: 'difuser',
  },
  {
    name: 'difuser5',
    image: 'assets/difuser5.png',
    description: 'description',
    size: 155,
    measure: 'ml',
    price: 80.22,
    category: 'difuser',
  },
  {
    name: 'hairCare1',
    image: 'assets/hairCare1.png',
    description: 'description',
    size: 255,
    measure: 'ml',
    price: 15.12,
    category: 'hairCare',
  },
  {
    name: 'hairCare2',
    image: 'assets/hairCare2.png',
    description: 'description',
    size: 255,
    measure: 'ml',
    price: 19.21,
    category: 'hairCare',
  },
  {
    name: 'hairCare3',
    image: 'assets/hairCare3.png',
    description: 'description',
    size: 255,
    measure: 'ml',
    price: 15.12,
    category: 'hairCare',
  },
  {
    name: 'hairCare4',
    image: 'assets/hairCare4.png',
    description: 'description',
    size: 255,
    measure: 'ml',
    price: 22.55,
    category: 'hairCare',
  },
  {
    name: 'hairCare5',
    image: 'assets/hairCare5.png',
    description: 'description',
    size: 255,
    measure: 'ml',
    price: 22.55,
    category: 'hairCare',
  },

  {
    name: 'massageOil1',
    image: 'assets/massageOil1.png',
    description: 'description',
    size: 155,
    measure: 'ml',
    price: 35.48,
    category: 'massageOil',
  },
  {
    name: 'massageOil2',
    image: 'assets/massageOil2.png',
    description: 'description',
    size: 125,
    measure: 'ml',
    price: 44.66,
    category: 'massageOil',
  },
  {
    name: 'massageOil3',
    image: 'assets/massageOil3.png',
    description: 'description',
    size: 145,
    measure: 'ml',
    price: 24.21,
    category: 'massageOil',
  },
  {
    name: 'massageOil4',
    image: 'assets/massageOil4.png',
    description: 'description',
    size: 165,
    measure: 'ml',
    price: 28.78,
    category: 'massageOil',
  },

  {
    name: 'roll1',
    image: 'assets/roll1.png',
    description: 'description',
    size: 15,
    measure: 'ml',
    price: 18.78,
    category: 'roll',
  },
  {
    name: 'roll2',
    image: 'assets/roll2.png',
    description: 'description',
    size: 15,
    measure: 'ml',
    price: 25.55,
    category: 'roll',
  },
  {
    name: 'roll3',
    image: 'assets/roll3.png',
    description: 'description',
    size: 15,
    measure: 'ml',
    price: 12.33,
    category: 'roll',
  },
  {
    name: 'roll4',
    image: 'assets/roll4.png',
    description: 'description',
    size: 15,
    measure: 'ml',
    price: 28.84,
    category: 'roll',
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
