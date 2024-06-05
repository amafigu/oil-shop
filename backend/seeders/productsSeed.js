import db from '../models/index.js';
/*
categories:
1 = roll, 2 = essential oil,3 = body care, 4 = difuser, 5 =  massage oil
*/

const products = [
  {
    brand: 'young living',
    name: 'angelica',
    image:
      'https://oylo-images.s3.us-east-2.amazonaws.com/oil_angelica_5_ml.jpg',
    description: 'great for mornings',
    size: 5,
    price: 15.88,
    categoryId: 2,
    details: 'with a lemon touch',
  },
  {
    brand: 'young living',
    name: 'eucalyptus blue',
    image:
      'https://oylo-images.s3.us-east-2.amazonaws.com/oil_eucalyptusBlue_15_ml.jpg',
    description: 'made of certificated trees',
    size: 15,
    price: 16.45,
    categoryId: 2,
    details: 'refreshing aroma',
  },
  {
    brand: 'young living',
    name: 'grapefruit',
    image:
      'https://oylo-images.s3.us-east-2.amazonaws.com/oil_grapefruit_15_ml.jpg',
    description: 'like a fruit',
    size: 15,
    price: 17.25,
    categoryId: 2,
    details: 'smells from the nature',
  },
  {
    brand: 'young living',
    name: 'jade lemon',
    image:
      'https://oylo-images.s3.us-east-2.amazonaws.com/oil_jadeLemon_5_ml.jpg',
    description: 'description',
    size: 5,
    price: 18.33,
    categoryId: 2,
    details: 'details',
  },
  {
    brand: 'young living',
    name: 'lavender',
    image:
      'https://oylo-images.s3.us-east-2.amazonaws.com/oil_lavender_15_ml.jpg',
    description: 'description',
    size: 15,
    price: 22.44,
    categoryId: 2,
    details: 'details',
  },
  {
    brand: 'young living',
    name: 'spearmint',
    image:
      'https://oylo-images.s3.us-east-2.amazonaws.com/oil_spearmint_15_ml.jpg',
    description: 'description',
    size: 15,
    price: 12.33,
    categoryId: 2,
    details: 'details',
  },
  {
    brand: 'young living',
    name: 'evening peace',
    image:
      'https://oylo-images.s3.us-east-2.amazonaws.com/bodyCare_eveningPeace_236_ml.jpg',
    description: 'description',
    size: 236,
    price: 23.65,
    categoryId: 3,
    details: 'details',
  },
  {
    brand: 'young living',
    name: 'morning start',
    image:
      'https://oylo-images.s3.us-east-2.amazonaws.com/bodyCare_morningStart_236_ml.jpg',
    description: 'description',
    size: 236,
    price: 23.69,
    categoryId: 3,
    details: 'details',
  },
  {
    brand: 'young living',
    name: 'sensation',
    image:
      'https://oylo-images.s3.us-east-2.amazonaws.com/bodyCare_sensation_236_ml.jpg',
    description: 'description',
    size: 236,
    price: 23.69,
    categoryId: 3,
    details: 'details',
  },
  {
    brand: 'young living',
    name: 'dragon time',
    image:
      'https://oylo-images.s3.us-east-2.amazonaws.com/bodyCare_dragonTime_236_ml.jpg',
    description: 'description',
    size: 236,
    price: 23.69,
    categoryId: 3,
    details: 'details',
  },
  {
    brand: 'young living',
    name: 'bath and shower',
    image:
      'https://oylo-images.s3.us-east-2.amazonaws.com/bodyCare_bathAndShower_236_ml.jpg',
    description: 'description',
    size: 236,
    price: 23.69,
    categoryId: 3,
    details: 'details',
  },

  {
    brand: 'young living',
    name: 'aroma_globe',
    image:
      'https://oylo-images.s3.us-east-2.amazonaws.com/difuser_aromaGlobe_eu.jpg',
    description: 'description',
    size: 285,
    price: 111.55,
    categoryId: 4,
    details: 'details',
  },
  {
    brand: 'young living',
    name: 'dewdrop',
    image:
      'https://oylo-images.s3.us-east-2.amazonaws.com/difuser_dewdrop_eu.jpg',
    description: 'description',
    size: 285,
    price: 111.55,
    categoryId: 4,
    details: 'details',
  },
  {
    brand: 'young living',
    name: 'feather the owl',
    image:
      'https://oylo-images.s3.us-east-2.amazonaws.com/difuser_featherTheOwl_eu.jpg',
    description: 'description',
    size: 285,
    price: 111.55,
    categoryId: 4,
    details: 'details',
  },
  {
    brand: 'young living',
    name: 'haven',
    image:
      'https://oylo-images.s3.us-east-2.amazonaws.com/difuser_haven_eu.jpg',
    description: 'description',
    size: 285,
    price: 111.55,
    categoryId: 4,
    details: 'details',
  },
  {
    brand: 'young living',
    name: 'lantern',
    image:
      'https://oylo-images.s3.us-east-2.amazonaws.com/difuser_lantern_eu.jpg',
    description: 'description',
    size: 285,
    price: 111.55,
    categoryId: 4,
    details: 'details',
  },
  {
    brand: 'young living',
    name: 'sweet aroma',
    image:
      'https://oylo-images.s3.us-east-2.amazonaws.com/difuser_sweetAroma_eu.jpg',
    description: 'description',
    size: 285,
    price: 111.55,
    categoryId: 4,
    details: 'details',
  },

  {
    brand: 'young living',
    name: 'v-6',
    image:
      'https://oylo-images.s3.us-east-2.amazonaws.com/oilMassage_v-6_944_ml.jpg',
    description: 'Enhanced Vegetable Oil Refill',
    size: 944,
    price: 35.48,
    categoryId: 5,
    details: 'details',
  },

  {
    brand: 'young living',
    name: 'relaxation',
    image:
      'https://oylo-images.s3.us-east-2.amazonaws.com/oilMassage_relaxation_236_ml.jpg',
    description: 'Vitality enhancer Vegetable Oil',
    size: 236,
    price: 35.48,
    categoryId: 5,
    details: 'details',
  },

  {
    brand: 'young living',
    name: 'cel-lite magic',
    image:
      'https://oylo-images.s3.us-east-2.amazonaws.com/oilMassage_cel-liteMagic_236_ml.jpg',
    description: 'Sking structure enhancer Vegetable Oil',
    size: 236,
    price: 35.48,
    categoryId: 5,
    details: 'details',
  },

  {
    brand: 'young living',
    name: 'breathe again',
    image:
      'https://oylo-images.s3.us-east-2.amazonaws.com/roll_breatheAgain_10_ml.jpg',
    description: 'Includes peppermint and copaiba',
    size: 10,
    price: 44.78,
    categoryId: 1,
    details: 'details',
  },
  {
    brand: 'young living',
    name: 'peace and calming',
    image:
      'https://oylo-images.s3.us-east-2.amazonaws.com/roll_peaceAndCalming_10_ml.jpg',
    description: 'A sweet, lemony and slightly floral scent.',
    size: 10,
    price: 35.55,
    categoryId: 1,
    details: 'details',
  },
  {
    brand: 'young living',
    name: 'thieves',
    image:
      'https://oylo-images.s3.us-east-2.amazonaws.com/roll_thieves_10_ml.jpg',
    description: 'description',
    size: 10,
    price: 32.33,
    categoryId: 1,
    details: 'details',
  },
  {
    brand: 'young living',
    name: 'stress away',
    image:
      'https://oylo-images.s3.us-east-2.amazonaws.com/roll_stressAway_10_ml.jpg',
    description: 'description',
    size: 10,
    price: 48.84,
    categoryId: 1,
    details: 'details',
  },
  {
    brand: 'young living',
    name: 'tranquil',
    image:
      'https://oylo-images.s3.us-east-2.amazonaws.com/roll_tranquil_10_ml.jpg',
    description: 'description',
    size: 10,
    price: 48.84,
    categoryId: 1,
    details: 'details',
  },
  {
    brand: 'young living',
    name: 'valor',
    image:
      'https://oylo-images.s3.us-east-2.amazonaws.com/roll_valor_10_ml.jpg',
    description: 'description',
    size: 10,
    price: 45.72,
    categoryId: 1,
    details: 'details',
  },
];

async function seed() {
  const categories = await db.productCategories.findAll();
  const categoryIds = categories.map((category) => category.id);
  try {
    for (const product of products) {
      if (!categoryIds.includes(product.categoryId)) {
        console.error(`categoryId not found for product: ${product.name}`);
        continue;
      }
      const existingProduct = await db.products.findOne({
        where: { name: product.name },
      });
      if (!existingProduct) {
        await db.products.create(product);
      }
    }

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
