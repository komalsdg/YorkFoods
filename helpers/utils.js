const CUISINES = [
  'ITALIAN', 'MEXICAN', 'CHINESE', 'JAPANESE', 'INDIAN',
  'AMERICAN', 'FRENCH', 'KOREAN', 'BRITISH', 'MEDITERRANEAN',
  'CARIBBEAN', 'CONTINENTAL'
];

function getRandomCuisine() {
  const randomIndex = Math.floor(Math.random() * CUISINES.length);
  return CUISINES[randomIndex];
}

module.exports = {
  getRandomCuisine
};
