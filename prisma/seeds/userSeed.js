const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const tokenHelper = require("../../helpers/token");
const { getRandomCuisine } = require("../../helpers/utils");

const prisma = new PrismaClient();

const USER_COUNT = 10;

async function seedUsers() {
  console.log("Seeding users...");

  for (let i = 1; i <= USER_COUNT; i++) {
    const email = `user${i}@example.com`;
    const name = `User ${i}`;
    const password = "12345678";
    const cuisinePreference = getRandomCuisine();
    const authenticationToken = tokenHelper.createToken(email);
    const hashedPassword = bcrypt.hashSync(password, 10);

    const dieticianData = {
      calories: Math.floor(Math.random() * (2500 - 1500 + 1)) + 1500,
      protein: Math.floor(Math.random() * (100 - 50 + 1)) + 50,
    };

    await prisma.user.create({
      data: {
        email,
        name,
        passwordHash: hashedPassword,
        cuisinePreference,
        authenticationToken,
        dieticianData,
        wallet: {
          create: {
            balance: 500,
          },
        },
      },
    });
  }

  console.log(`${USER_COUNT} users seeded.`);
}

module.exports = seedUsers;
