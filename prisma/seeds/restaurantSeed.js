const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const tokenHelper = require("../../helpers/token");
const { getRandomCuisine } = require("../../helpers/utils");

const prisma = new PrismaClient();

const RESTAURANT_COUNT = 10;
const MIN_MENU_ITEMS = 3;
const MAX_MENU_ITEMS = 10;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function formatSubdomain(name) {
  return name.toLowerCase().replace(/\s+/g, "-");
}

async function seedMenuItems(restaurantId) {
  console.log(`Seeding menu items for restaurant ${restaurantId}...`);
  const menuItemCount = getRandomInt(MIN_MENU_ITEMS, MAX_MENU_ITEMS);

  for (let i = 0; i < menuItemCount; i++) {
    await prisma.menuItem.create({
      data: {
        restaurantId,
        name: `Menu Item ${restaurantId}-${i + 1}`,
        description: `Description for Menu Item ${restaurantId}-${i + 1}`,
        price: parseFloat((Math.random() * 50).toFixed(2)),
        quantity: getRandomInt(1, 20),
        nutritionalValues: {
          calories: getRandomInt(200, 800),
          protein: getRandomInt(10, 50),
        },
      },
    });
  }
}

async function seedRestaurants() {
  console.log("Seeding restaurants...");

  for (let i = 1; i <= RESTAURANT_COUNT; i++) {
    const name = `Restaurant ${i}`;
    const email = `restaurant${i}@example.com`;
    const password = "12345678";
    const cuisineType = getRandomCuisine();
    const location = "Location";
    const subdomain = formatSubdomain(name);
    const authenticationToken = tokenHelper.createToken(email);
    const hashedPassword = bcrypt.hashSync(password, 10);

    await prisma.restaurant.create({
      data: {
        email,
        name,
        passwordHash: hashedPassword,
        cuisineType,
        authenticationToken,
        location,
        subdomain,
      },
    });

    await seedMenuItems(i);
  }

  console.log(`${RESTAURANT_COUNT} restaurants seeded.`);
}

module.exports = seedRestaurants;
