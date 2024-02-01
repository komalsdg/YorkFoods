const seedUsers = require("./seeds/userSeed");
const seedRestaurants = require("./seeds/restaurantSeed");
const seedOrdersAndItems = require("./seeds/orderSeed");

async function main() {
  await seedUsers();
  await seedRestaurants();
  await seedOrdersAndItems();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    console.log("Seeding finished.");
  });