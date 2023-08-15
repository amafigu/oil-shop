import db from '../models/index.js';

const products = [
  {
    name: 'angelica',
    image: 'oil_angelica_5_ml.jpg',
    description: 'description',
    size: 5,
    measure: 'ml',
    price: 15.88,
    category: 'essential_oil',
    details: 'Reduces the wrinkles, increases skin firmness.',
  },
  {
    name: 'eucalyptus_blue',
    image: 'oil_eucalyptusBlue_15_ml.jpg',
    description: 'description',
    size: 15,
    measure: 'ml',
    price: 16.45,
    category: 'essential_oil',
    details: 'Reduces the wrinkles, increases skin firmness.',
  },
  {
    name: 'grapefruit',
    image: 'oil_grapefruit_15_ml.jpg',
    description: 'description',
    size: 15,
    measure: 'ml',
    price: 17.25,
    category: 'essential_oil',
    details: 'Reduces the wrinkles, increases skin firmness.',
  },
  {
    name: 'jade_lemon',
    image: 'oil_jadeLemon_5_ml.jpg',
    description: 'description',
    size: 5,
    measure: 'ml',
    price: 18.33,
    category: 'essential_oil',
    details: 'Reduces the wrinkles, increases skin firmness.',
  },
  {
    name: 'lavender',
    image: 'oil_lavender_15_ml.jpg',
    description: 'description',
    size: 15,
    measure: 'ml',
    price: 22.44,
    category: 'essential_oil',
    details: 'Reduces the wrinkles, increases skin firmness.',
  },
  {
    name: 'spearmint',
    image: 'oil_spearmint_15_ml.jpg',
    description: 'description',
    size: 15,
    measure: 'ml',
    price: 12.33,
    category: 'essential_oil',
    details: 'Reduces the wrinkles, increases skin firmness.',
  },
  {
    name: 'evening_peace',
    image: 'bodyCare_eveningPeace_236_ml.jpg',
    description: 'description',
    size: 236,
    measure: 'ml',
    price: 23.65,
    category: 'body_care',
    details: 'shower gel.',
  },
  {
    name: 'morning_start',
    image: 'bodyCare_morningStart_236_ml.jpg',
    description: 'description',
    size: 236,
    measure: 'ml',
    price: 23.69,
    category: 'body_care',
    details: 'shower gel.',
  },
  {
    name: 'sensation',
    image: 'bodyCare_sensation_236_ml.jpg',
    description: 'description',
    size: 236,
    measure: 'ml',
    price: 23.69,
    category: 'body_care',
    details: 'shower gel.',
  },
  {
    name: 'dragon_time',
    image: 'bodyCare_dragonTime_236_ml.jpg',
    description: 'description',
    size: 236,
    measure: 'ml',
    price: 23.69,
    category: 'body_care',
    details: 'shower gel.',
  },
  {
    name: 'bath_and_shower',
    image: 'bodyCare_bathAndShower_236_ml.jpg',
    description: 'description',
    size: 236,
    measure: 'ml',
    price: 23.69,
    category: 'body_care',
    details: 'shower gel.',
  },

  {
    name: 'aroma_globe',
    image: 'difuser_aromaGlobe_eu.jpg',
    description: 'description',
    size: 285,
    measure: 'ml',
    price: 111.55,
    category: 'difuser',
    details: 'Reduces the wrinkles, increases skin firmness.',
  },
  {
    name: 'dewdrop',
    image: 'difuser_dewdrop_eu.jpg',
    description: 'description',
    size: 285,
    measure: 'ml',
    price: 111.55,
    category: 'difuser',
    details: 'Reduces the wrinkles, increases skin firmness.',
  },
  {
    name: 'feather_the_owl',
    image: 'difuser_featherTheOwl_eu.jpg',
    description: 'description',
    size: 285,
    measure: 'ml',
    price: 111.55,
    category: 'difuser',
    details: 'Reduces the wrinkles, increases skin firmness.',
  },
  {
    name: 'haven',
    image: 'difuser_haven_eu.jpg',
    description: 'description',
    size: 285,
    measure: 'ml',
    price: 111.55,
    category: 'difuser',
    details: 'Reduces the wrinkles, increases skin firmness.',
  },
  {
    name: 'lantern',
    image: 'difuser_lantern_eu.jpg',
    description: 'description',
    size: 285,
    measure: 'ml',
    price: 111.55,
    category: 'difuser',
    details: 'Reduces the wrinkles, increases skin firmness.',
  },
  {
    name: 'sweet_aroma',
    image: 'difuser_sweetAroma_eu.jpg',
    description: 'description',
    size: 285,
    measure: 'ml',
    price: 111.55,
    category: 'difuser',
    details: 'Reduces the wrinkles, increases skin firmness.',
  },

  {
    name: 'v-6',
    image: 'oilMassage_v-6_944_ml.jpg',
    description: 'Enhanced Vegetable Oil Refill',
    size: 944,
    measure: 'ml',
    price: 35.48,
    category: 'massage_oil',
    details: 'Reduces the wrinkles, increases skin firmness.',
  },

  {
    name: 'relaxation',
    image: 'oilMassage_relaxation_236_ml.jpg',
    description: 'Vitality enhancer Vegetable Oil',
    size: 236,
    measure: 'ml',
    price: 35.48,
    category: 'massage_oil',
    details: 'Reduces stress.',
  },

  {
    name: 'cel-lite_magic',
    image: 'oilMassage_cel-liteMagic_236_ml.jpg',
    description: 'Sking structure enhancer Vegetable Oil',
    size: 236,
    measure: 'ml',
    price: 35.48,
    category: 'massage_oil',
    details: 'Reduces stress.',
  },

  {
    name: 'breathe_again',
    image: 'roll_breatheAgain_10_ml.jpg',
    description: 'Includes peppermint and copaiba',
    size: 10,
    measure: 'ml',
    price: 44.78,
    category: 'roll',
    details: 'Invigorating and awakening arom',
  },
  {
    name: 'peace_and_calming',
    image: 'roll_peaceAndCalming_10_ml.jpg',
    description: 'A sweet, lemony and slightly floral scent.',
    size: 10,
    measure: 'ml',
    price: 35.55,
    category: 'roll',
    details: 'In the evening, relax and apply some to your neck and wrists.',
  },
  {
    name: 'thieves',
    image: 'roll_thieves_10_ml.jpg',
    description: 'description',
    size: 10,
    measure: 'ml',
    price: 32.33,
    category: 'roll',
    details: 'Reduces the wrinkles, increases skin firmness.',
  },
  {
    name: 'stress_away',
    image: 'roll_stressAway_10_ml.jpg',
    description: 'description',
    size: 10,
    measure: 'ml',
    price: 48.84,
    category: 'roll',
    details: 'Reduces the wrinkles, increases skin firmness.',
  },
  {
    name: 'tranquil',
    image: 'roll_tranquil_10_ml.jpg',
    description: 'description',
    size: 10,
    measure: 'ml',
    price: 48.84,
    category: 'roll',
    details: 'Reduces the wrinkles, increases skin firmness.',
  },
  {
    name: 'valor',
    image: 'roll_valor_10_ml.jpg',
    description: 'description',
    size: 10,
    measure: 'ml',
    price: 45.72,
    category: 'roll',
    details: 'Reduces the wrinkles, increases skin firmness.',
  },
];

async function seed() {
  const categories = await db.productCategory.findAll();

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

      // Check if product exists before creating to avoid duplication
      const existingProduct = await db.product.findOne({
        where: { name: productToInsert.name },
      });
      if (!existingProduct) {
        await db.product.create(productToInsert);
      }
    }

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
