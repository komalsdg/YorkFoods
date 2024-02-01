const { strict } = require("yargs");
const yup = require("yup");

const orderSchema = yup
  .object()
  .shape({
    restaurantId: yup.number().required(),
    menuItemIds: yup
      .array()
      .of(
        yup
          .object()
          .shape({
            menuItemId: yup.number().required(),
            quantity: yup.number().required(),
          })
          .strict(true)
      )
      .min(1),
  })
  .noUnknown();

const orderUpdateSchema = yup
  .object()
  .shape({
    status: yup.string().required(),
  })
  .noUnknown();

module.exports = { orderSchema, orderUpdateSchema };