const prisma = require("../../prismaClient");
const {
  menuItemSchema,
  menuItemUpdateSchema,
} = require("../../validations/menuItem");

//list a restaurant's menu items
const getMenuItemsByRestaurants = async (req, res) => {
  try {
    const { id } = req.params;
    const menuItems = await prisma.menuItem.findMany({
      select: {
        id: true,
        restaurantId: true,
        name: true,
        description: true,
        price: true,
        quantity: true,
        nutritionalValues: true,
      },
      where: {
        restaurantId: parseInt(id), // extra condition to hide archived menu items from users
      },
    });
    res.json(menuItems);
  } catch (error) {
    console.log("Error in getMenuItemsByRestaurants", error.message);
    res.status(500).send({ error: error.message });
  }
};

//insert menuitem
const insertMenuItem = async (req, res) => {
  try {
    const {
      //   restaurantId,
      name,
      description,
      price,
      quantity,
      nutritionalValues,
    } = req.body;
    await menuItemSchema.validate(req.body, { stripUnknown: false });
    const newMenuItem = await prisma.menuItem.create({
      data: {
        restaurantId: req.entity.id,
        name,
        description,
        price,
        quantity,
        nutritionalValues,
      },
    });
    res.json(newMenuItem);
  } catch (error) {
    console.log("Error in insertMenuItem", error.message);
    res.status(500).send({ error: error.message });
  }
};

//update menuItem by menuid
const updateMenuItem = async (req, res) => {
  const body = req.body;
  try {
    await menuItemUpdateSchema.validate(body);

    const menuItemId = parseInt(req.params.id);
    const restaurantId = req.entity.id;

    const menuItem = await prisma.menuItem.findUnique({
      where: { id: menuItemId },
    });

    if (!menuItem || menuItem.restaurantId !== restaurantId) {
      return res.status(404).send({
        error: "Menu item not found or does not belong to the restaurant",
      });
    }

    const updatedMenuItem = await prisma.menuItem.update({
      where: { id: menuItemId },
      data: {
        ...menuItem,
        ...body,
      },
    });

    res.send(updatedMenuItem);
  } catch (error) {
    console.log("Error in updateMenuItem", error.message);
    res.status(500).send({ error: error.message });
  }
};

//delete menuitem by menuid
const archiveMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const archivedMenuItem = await prisma.menuItem.update({
      where: { id: parseInt(id) },
      data: {
        deletedAt: new Date(),
      },
    });
    res.send(archivedMenuItem);
  } catch (error) {
    console.log("Error in archiveMenuItem", error.message);
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  getMenuItemsByRestaurants,
  insertMenuItem,
  updateMenuItem,
  archiveMenuItem,
};
