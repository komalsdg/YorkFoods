const yup = require('yup');

const restaurantSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  cuisineType: yup.string().oneOf(['ITALIAN', 'MEXICAN', 'CHINESE', 'JAPANESE', 'INDIAN', 'AMERICAN', 'FRENCH', 'KOREAN', 'BRITISH', 'MEDITERRANEAN', 'CARIBBEAN', 'CONTINENTAL', null]).required(),
  location: yup.string().email().required(),
  subdomain: yup.string().email().required()
});

module.exports = { restaurantSchema};