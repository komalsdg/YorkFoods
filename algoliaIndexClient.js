const algoliasearch = require("algoliasearch");
const prisma = require("./prismaClient");
require("dotenv").config();

const client = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_ADMIN_API_KEY
);
const restaurantsIndex = client.initIndex("restaurant_data_index");
const menuItemsIndex = client.initIndex("menu_items_data_index");

const restaurantRecords = async () => {
  const records = await prisma.restaurant.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      subdomain: true,
      cuisineType: true,
      location: true,
    },
    where: {
      deletedAt: null,
    },
  });
  return records;
};

const menuItemRecords = async () => {
  const records = await prisma.menuItem.findMany({
    select: {
      id: true,
      name: true,
      price: true,
      nutritionalValues: true,
      restaurantId: true,
    },
    where: {
      deletedAt: null,
    },
  });
  return records;
};

async function main() {
  try {
    const restaurant_records = await restaurantRecords();
    const menu_item_records = await menuItemRecords();

    await restaurantsIndex
      .saveObjects(restaurant_records, {
        autoGenerateObjectIDIfNotExist: true,
      })
      .wait();

    await menuItemsIndex
      .saveObjects(menu_item_records, {
        autoGenerateObjectIDIfNotExist: true,
      })
      .wait();
  } catch (error) {
    console.log(error);
  }
}

main();
