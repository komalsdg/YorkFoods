const prisma = require("../../prismaClient");
// const {
//   orderSchema,
//   orderUpdateSchema,
// } = require("../../validations/orders");

//list a restaurant's order
const getUserOrders = async (req, res) => {
  try {
    const user = req.entity;
    const orders = await prisma.order.findMany({
      select: {
        id: true,
        userId: true,
        restaurantId: true,
        totalPrice: true,
        status: true,
      },
      where: {
        userId: user.id, // extra condition to hide archived menu items from users
      },
    });
    res.json(orders);
  } catch (error) {
    console.log("Error in getOrders", error.message);
    res.status(500).send({ error: error.message });
  }
};

// //insert menuitem
// const insertMenuItem = async (req, res) => {
//   try {
//     const {
//       //   restaurantId,
//       name,
//       description,
//       price,
//       quantity,
//       nutritionalValues,
//     } = req.body;
//     await menuItemSchema.validate(req.body, { stripUnknown: false });
//     const newMenuItem = await prisma.menuItem.create({
//       data: {
//         restaurantId: req.entity.id,
//         name,
//         description,
//         price,
//         quantity,
//         nutritionalValues,
//       },
//     });
//     res.json(newMenuItem);
//   } catch (error) {
//     console.log("Error in insertMenuItem", error.message);
//     res.status(500).send({ error: error.message });
//   }
// };

// //update menuItem by menuid
// const updateMenuItem = async (req, res) => {
//   const body = req.body;
//   try {
//     await menuItemUpdateSchema.validate(body);

//     const menuItemId = parseInt(req.params.id);
//     const restaurantId = req.entity.id;

//     const menuItem = await prisma.menuItem.findUnique({
//       where: { id: menuItemId },
//     });

//     if (!menuItem || menuItem.restaurantId !== restaurantId) {
//       return res.status(404).send({
//         error: "Menu item not found or does not belong to the restaurant",
//       });
//     }

//     const updatedMenuItem = await prisma.menuItem.update({
//       where: { id: menuItemId },
//       data: {
//         ...menuItem,
//         ...body,
//       },
//     });

//     res.send(updatedMenuItem);
//   } catch (error) {
//     console.log("Error in updateMenuItem", error.message);
//     res.status(500).send({ error: error.message });
//   }
// };

// //delete menuitem by menuid
// const archiveMenuItem = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const archivedMenuItem = await prisma.menuItem.update({
//       where: { id: parseInt(id) },
//       data: {
//         deletedAt: new Date(),
//       },
//     });
//     res.send(archivedMenuItem);
//   } catch (error) {
//     console.log("Error in archiveMenuItem", error.message);
//     res.status(500).send({ error: error.message });
//   }
// };

module.exports = {
  getUserOrders,
//   insertMenuItem,
//   updateMenuItem,
//   archiveMenuItem,
};
