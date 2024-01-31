const seedUsers = require("./seeds/userSeed");
const seedRestaurants = require("./seeds/restaurantSeed");

async function main() {
  await seedUsers();
  await seedRestaurants();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    console.log("Seeding finished.");
  });
