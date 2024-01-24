import db from '../models/index.js';

const products = [
  {
    name: 'angelica',
    image:
      'https://oylo-images.s3.us-east-2.amazonaws.com/oil_angelica_5_ml.jpg',
    description: 'description',
    size: 5,
    price: 15.88,
    category: 'essential_oil',
    details: 'details',
  },
  {
    name: 'eucalyptus_blue',
    image:
      'https://oylo-images.s3.us-east-2.amazonaws.com/oil_eucalyptusBlue_15_ml.jpg',
    description: 'description',
    size: 15,
    price: 16.45,
    category: 'essential_oil',
    details: 'details',
  },
  {
    name: 'grapefruit',
    image:
      'https://oylo-images.s3.us-east-2.amazonaws.com/oil_grapefruit_15_ml.jpg',
    description: 'description',
    size: 15,
    price: 17.25,
    category: 'essential_oil',
    details: 'details',
  },
  {
    name: 'jade_lemon',
    image:
      'https://oylo-images.s3.us-east-2.amazonaws.com/oil_jadeLemon_5_ml.jpg',
    description: 'description',
    size: 5,
    price: 18.33,
    category: 'essential_oil',
    details: 'details',
  },
  {
    name: 'lavender',
    image:
      'https://oylo-images.s3.us-east-2.amazonaws.com/oil_lavender_15_ml.jpg',
    description: 'description',
    size: 15,
    price: 22.44,
    category: 'essential_oil',
    details: 'details',
  },
  {
    name: 'spearmint',
    image:
      'https://oylo-images.s3.us-east-2.amazonaws.com/oil_spearmint_15_ml.jpg',
    description: 'description',
    size: 15,
    price: 12.33,
    category: 'essential_oil',
    details: 'details',
  },
  {
    name: 'evening_peace',
    image:
      'https://oylo-images.s3.us-east-2.amazonaws.com/bodyCare_eveningPeace_236_ml.jpg',
    description: 'description',
    size: 236,
    price: 23.65,
    category: 'body_care',
    details: 'details',
  },
  {
    name: 'morning_start',
    image:
      'https://oylo-images.s3.us-east-2.amazonaws.com/bodyCare_morningStart_236_ml.jpg',
    description: 'description',
    size: 236,
    price: 23.69,
    category: 'body_care',
    details: 'details',
  },
  {
    name: 'sensation',
    image:
      'https://oylo-images.s3.us-east-2.amazonaws.com/bodyCare_sensation_236_ml.jpg',
    description: 'description',
    size: 236,
    price: 23.69,
    category: 'body_care',
    details: 'details',
  },
  {
    name: 'dragon_time',
    image:
      'https://oylo-images.s3.us-east-2.amazonaws.com/bodyCare_dragonTime_236_ml.jpg',
    description: 'description',
    size: 236,
    price: 23.69,
    category: 'body_care',
    details: 'details',
  },
  {
    name: 'bath_and_shower',
    image:
      'https://oylo-images.s3.us-east-2.amazonaws.com/bodyCare_bathAndShower_236_ml.jpg',
    description: 'description',
    size: 236,
    price: 23.69,
    category: 'body_care',
    details: 'details',
  },

  {
    name: 'aroma_globe',
    image:
      'https://oylo-images.s3.us-east-2.amazonaws.com/difuser_aromaGlobe_eu.jpg',
    description: 'description',
    size: 285,
    price: 111.55,
    category: 'difuser',
    details: 'details',
  },
  {
    name: 'dewdrop',
    image:
      'https://oylo-images.s3.us-east-2.amazonaws.com/difuser_dewdrop_eu.jpg',
    description: 'description',
    size: 285,
    price: 111.55,
    category: 'difuser',
    details: 'details',
  },
  {
    name: 'feather_the_owl',
    image:
      'https://oylo-images.s3.us-east-2.amazonaws.com/difuser_featherTheOwl_eu.jpg',
    description: 'description',
    size: 285,
    price: 111.55,
    category: 'difuser',
    details: 'details',
  },
  {
    name: 'haven',
    image:
      'https://oylo-images.s3.us-east-2.amazonaws.com/difuser_haven_eu.jpg',
    description: 'description',
    size: 285,
    price: 111.55,
    category: 'difuser',
    details: 'details',
  },
  {
    name: 'lantern',
    image:
      'https://oylo-images.s3.us-east-2.amazonaws.com/difuser_lantern_eu.jpg',
    description: 'description',
    size: 285,
    price: 111.55,
    category: 'difuser',
    details: 'details',
  },
  {
    name: 'sweet_aroma',
    image:
      'https://oylo-images.s3.us-east-2.amazonaws.com/difuser_sweetAroma_eu.jpg',
    description: 'description',
    size: 285,
    price: 111.55,
    category: 'difuser',
    details: 'details',
  },

  {
    name: 'v-6',
    image:
      'https://oylo-images.s3.us-east-2.amazonaws.com/oilMassage_v-6_944_ml.jpg',
    description: 'Enhanced Vegetable Oil Refill',
    size: 944,
    price: 35.48,
    category: 'massage_oil',
    details: 'details',
  },

  {
    name: 'relaxation',
    image:
      'https://oylo-images.s3.us-east-2.amazonaws.com/oilMassage_relaxation_236_ml.jpg',
    description: 'Vitality enhancer Vegetable Oil',
    size: 236,
    price: 35.48,
    category: 'massage_oil',
    details: 'details',
  },

  {
    name: 'cel-lite_magic',
    image:
      'https://oylo-images.s3.us-east-2.amazonaws.com/oilMassage_cel-liteMagic_236_ml.jpg',
    description: 'Sking structure enhancer Vegetable Oil',
    size: 236,
    price: 35.48,
    category: 'massage_oil',
    details: 'details',
  },

  {
    name: 'breathe_again',
    image:
      'https://oylo-images.s3.us-east-2.amazonaws.com/roll_breatheAgain_10_ml.jpg',
    description: 'Includes peppermint and copaiba',
    size: 10,
    price: 44.78,
    category: 'roll',
    details: 'details',
  },
  {
    name: 'peace_and_calming',
    image:
      'https://oylo-images.s3.us-east-2.amazonaws.com/roll_peaceAndCalming_10_ml.jpg',
    description: 'A sweet, lemony and slightly floral scent.',
    size: 10,
    price: 35.55,
    category: 'roll',
    details: 'details',
  },
  {
    name: 'thieves',
    image:
      'https://oylo-images.s3.us-east-2.amazonaws.com/roll_thieves_10_ml.jpg',
    description: 'description',
    size: 10,
    price: 32.33,
    category: 'roll',
    details: 'details',
  },
  {
    name: 'stress_away',
    image:
      'https://oylo-images.s3.us-east-2.amazonaws.com/roll_stressAway_10_ml.jpg',
    description: 'description',
    size: 10,
    price: 48.84,
    category: 'roll',
    details: 'details',
  },
  {
    name: 'tranquil',
    image:
      'https://oylo-images.s3.us-east-2.amazonaws.com/roll_tranquil_10_ml.jpg',
    description: 'description',
    size: 10,
    price: 48.84,
    category: 'roll',
    details: 'details',
  },
  {
    name: 'valor',
    image:
      'https://oylo-images.s3.us-east-2.amazonaws.com/roll_valor_10_ml.jpg',
    description: 'description',
    size: 10,
    price: 45.72,
    category: 'roll',
    details: 'details',
  },
];

async function seed() {
  const categories = await db.productCategories.findAll();

  const categoryIdMap = categories.reduce((map, category) => {
    map[category.name] = category.id;
    return map;
  }, {});

  try {
    for (const product of products) {
      const productToInsert = {
        ...product,
        productCategoryId: categoryIdMap[product.category],
      };
      if (!productToInsert.productCategoryId) {
        console.error(`Category not found for product: ${product.name}`);
      }
      delete productToInsert.category;

      const existingProduct = await db.products.findOne({
        where: { name: productToInsert.name },
      });
      if (!existingProduct) {
        await db.products.create(productToInsert);
      }
    }

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
