const algoliasearch = require("algoliasearch");
require("dotenv").config();

const prisma = require("../../prismaClient");

const client = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_ADMIN_API_KEY
);
const restaurantIndex = client.initIndex("restaurant_data_index");
const menuItemsIndex = client.initIndex("menu_items_data_index");

const search = async (req, res) => {
  try {
    const query = req.query.searchTerm?.toString() || "";
    const cuisine = req.query.cuisineType?.toString() || "";

    const filter = `cuisineType:${cuisine}`;

    const menuItems = await menuItemsIndex.search(query, {
      filters: "nutritionalValues.calories > 780",
    });

    const restaurants = await restaurantIndex.search("", {
      filters: filter,
    });

    res.json({ menuItems, restaurants });
  } catch (error) {
    console.error("Error performing searches:", error);
    res.status(500).send({ error: error.message });
  }
};

const searchRestaurantsByCuisineAndName = async (req, res) => {
  // localhost:3000/api/v1/search/restaurants?searchTerm=8&cuisineType=CHINESE
  try {
    const searchTerm = req.query.searchTerm?.toString() || "";
    const cuisine = req.query.cuisineType?.toString() || "";
    const filter = `cuisineType:${cuisine}`;
    const restaurants = await restaurantIndex.search(searchTerm, {
      filters: filter,
    });

    res.json({ restaurants });
  } catch (error) {
    console.error(
      "Error performing restaurant search by cuisine and name",
      error
    );
    res.status(500).send({ error: error.message });
  }
};

const searchMenuItemsByName = async (req, res) => {
  try {
    // fetch current user here

    const user = await prisma.user.findUnique({
      where: {
        id: req.entity.id,
      },
    });

    const searchTerm = req.query.searchTerm?.toString() || "";
    filters = `nutritionalValues.calories < ${
      user?.dieticianData?.calories || 300
    }`;
    const menuItems = await menuItemsIndex.search(searchTerm, {
      filters: filters,
    });

    res.json({ menuItems });
  } catch (error) {
    console.error("Error performing menu item search by name", error);
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  searchRestaurantsByCuisineAndName,
  searchMenuItemsByName
};
