const yup = require("yup");

const userUpdateSchema = yup.object().shape({
  name: yup.string(),
  cuisinePreference: yup.string().oneOf(['ITALIAN', 'MEXICAN', 'CHINESE', 'JAPANESE', 'INDIAN', 'AMERICAN', 'FRENCH', 'KOREAN', 'BRITISH', 'MEDITERRANEAN', 'CARIBBEAN', 'CONTINENTAL'])
});

module.exports = { userUpdateSchema };