const yup = require("yup");

const restaurantSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  cuisineType: yup
    .string()
    .oneOf([
      "ITALIAN",
      "MEXICAN",
      "CHINESE",
      "JAPANESE",
      "INDIAN",
      "AMERICAN",
      "FRENCH",
      "KOREAN",
      "BRITISH",
      "MEDITERRANEAN",
      "CARIBBEAN",
      "CONTINENTAL",
    ])
    .required(),
  location: yup.string().required(),
  subdomain: yup.string().required(),
});

const restaurantUpdateSchema = yup
  .object()
  .shape({
    name: yup.string(),
    cuisineType: yup
      .string()
      .oneOf([
        "ITALIAN",
        "MEXICAN",
        "CHINESE",
        "JAPANESE",
        "INDIAN",
        "AMERICAN",
        "FRENCH",
        "KOREAN",
        "BRITISH",
        "MEDITERRANEAN",
        "CARIBBEAN",
        "CONTINENTAL",
      ]),
    location: yup.string(),
    subdomain: yup.string(),
  })
  .noUnknown();

module.exports = { restaurantSchema, restaurantUpdateSchema };
