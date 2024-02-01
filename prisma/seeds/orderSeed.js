const { PrismaClient } = require("@prisma/client");

const ORDER_COUNT = 20; // Total number of orders to create
const MAX_ITEMS_PER_ORDER = 5; // Max number of items per order

const prisma = new PrismaClient();


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function seedOrdersAndItems() {
  console.log('Seeding orders and order items...');

  for (let i = 0; i < ORDER_COUNT; i++) {
    const userId = getRandomInt(1, 10);
    const restaurantId = getRandomInt(1, 10);

    // Fetch menu items for the selected restaurant
    const menuItems = await prisma.menuItem.findMany({
      where: { restaurantId: restaurantId },
      select: { id: true } // Only select the id of the menu items
    });

    if (menuItems.length === 0) {
      console.log(`No menu items found for restaurantId ${restaurantId}. Skipping order creation.`);
      continue; // Skip to next iteration if no menu items found
    }

    const totalPrice = getRandomInt(20, 100); // Random total price
    const status = 'completed'; // Example status

    const order = await prisma.order.create({
      data: {
        userId,
        restaurantId,
        totalPrice,
        status,
      },
    });

    const itemsCount = getRandomInt(1, Math.min(MAX_ITEMS_PER_ORDER, menuItems.length));
    for (let j = 0; j < itemsCount; j++) {
      const randomMenuItemIndex = getRandomInt(0, menuItems.length - 1);
      const menuItemId = menuItems[randomMenuItemIndex].id;

      await prisma.orderItem.create({
        data: {
          orderId: order.id,
          menuItemId,
          quantity: getRandomInt(1, 3),
          price: getRandomInt(5, 30),
        },
      });
    }
  }

  console.log(`${ORDER_COUNT} orders with order items seeded.`);
}

module.exports = seedOrdersAndItems;