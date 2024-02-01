const algoliasearch = require("algoliasearch");
require("dotenv").config();

const client = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_ADMIN_API_KEY
);
const restaurantIndex = client.initIndex("restaurant_data_index");
const menuItemsIndex = client.initIndex("menu_items_data_index");

const search = async (req, res) => {
  try {
    const query = req.query.searchTerm.toString || "";
    const cuisine = req.query.cuisineType.toString || "";

    const menuItems = await menuItemsIndex.search(query, {
      filters: "nutritionalValues.calories > 780",
    });

    const restaurants = await restaurantIndex.search(query, {
      filters: "cuisineType:CHINESE",
    });

    res.json({ menuItems, restaurants });
  } catch (error) {
    console.error("Error performing searches:", error);
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  search,
};
