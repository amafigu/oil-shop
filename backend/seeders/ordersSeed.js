import db from '../models/index.js';

const customers = [
  { email: 'customer1@mail.com' },
  { email: 'customer2@mail.com' },
  { email: 'customer3@mail.com' },
  { email: 'customer4@mail.com' },
  { email: 'customer5@mail.com' },
  { email: 'customer6@mail.com' },
  { email: 'customer7@mail.com' },
  { email: 'customer8@mail.com' },
  { email: 'customer9@mail.com' },
];

async function seed() {
  const products = await db.products.findAll();
  const productIds = products.map((product) => product.id);

  const randomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  try {
    for (const customer of customers) {
      const existingUser = await db.users.findOne({
        where: { email: customer.email },
      });
      if (!existingUser) {
        throw new Error(`Customer with email ${customer} was not found`);
      }
      const randomProductId = productIds[randomInt(0, productIds.length - 1)];
      const product = await db.products.findOne({
        where: { id: randomProductId },
      });

      const order = {
        userId: existingUser.id,
        totalAmount: product.price,
        paymentMethod: 'paypal',
      };
      const createdOrder = await db.orders.create(order);
      if (!createdOrder) {
        throw new Error('It is not possible to create the order');
      }
      const orderItem = {
        orderId: createdOrder.id,
        productId: randomProductId,
        quantity: 1,
      };
      const createdOrderItem = await db.orderItems.create(orderItem);
      if (!createdOrderItem) {
        throw new Error('It is not possible to create the item');
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
