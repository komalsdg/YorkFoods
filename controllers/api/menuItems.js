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
                nutritionalValues: true
            },
            where: {
                restaurantId: parseInt(id),
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
      const { restaurantId, name, description, price, quantity, nutritionalValues } =
        req.body;
      await menuItemSchema.validate(req.body);
      const newmenuItem = await prisma.menuitem.create({
        data: {
            restaurantId,
          name,
          description,
          price,
          quantity,
          nutritionalValues
        },
      });
      res.json(newmenuItem);
    } catch (error) {
      console.log("Error in insertMenuItem", error.message);
      res.status(500).send({ error: error.message });
    }
  };

//update menuItem by menuid
const updateMenuItem = async (req, res) => {
    const body = req.body;
    try {
        await menuItemUpdateSchema.validate(req.body);

        const { id, ...menuItemData } = req.entity;

        const updateMenuItem = await prisma.menuitem.update({
            where: { id: id },
            data: {
                ...menuItemData,
                ...body,
            },
        });
        res.send(updateMenuItem);
    } catch (error) {
        console.log("Error in updateMenuItem", error.message);
        res.status(500).send({ error: error.message });
    }
};

//delete menuitem by menuid
const archiveMenuItem = async (req, res) => {
    try {
        const { id } = req.params;
        const archiveMenuItem = await prisma.menuitem.update({
            where: { id: parseInt(id) },
            select: {
                deletedAt: true,
            },
            data: {
                deletedAt: new Date(),
            },
        });
        res.send(archiveMenuItem);
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