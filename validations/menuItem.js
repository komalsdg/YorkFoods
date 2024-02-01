const yup = require("yup");

const menuItemSchema = yup
  .object()
  .shape({
    name: yup.string().required(),
    description: yup.string().required(),
    price: yup.number().required(),
    quantity: yup.number().required(),
    nutritionalValues: yup
      .object()
      .shape({
        protein: yup.string().required(),
        calories: yup.string().required(),
      })
      .required()
      .strict(true),
  })
  .noUnknown();

const menuItemUpdateSchema = yup
  .object()
  .shape({
    name: yup.string(),
    description: yup.string(),
    price: yup.number(),
    quantity: yup.number(),
    nutritionalValues: yup
      .object()
      .shape({
        protein: yup.string().required(),
        calories: yup.string().required(),
      })
      .strict(true),
  })
  .noUnknown();

module.exports = { menuItemSchema, menuItemUpdateSchema };
