const yup = require("yup");

const orderSchema = yup
    .object()
    .shape({
        totalprice: yup.number().required(),
        menuItemId: yup.array().of(yup.object().shape({
            menuItemId: yup.number()
        }))
    })
    .noUnknown();

const orderUpdateSchema = yup
    .object()
    .shape({
        status: yup.string().required()
    })
    .noUnknown();

module.exports = { orderSchema, orderUpdateSchema };
