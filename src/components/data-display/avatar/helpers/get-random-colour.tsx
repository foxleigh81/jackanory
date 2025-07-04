// What colours can the colour randomiser choose from?
const allowedColours = [
  '#F44336',
  '#E91E63',
  '#9C27B0',
  '#673AB7',
  '#3F51B5',
  '#2196F3',
  '#03A9F4',
  '#00BCD4',
  '#009688',
  '#4CAF50',
  '#8BC34A',
  '#FF9800',
  '#FF5722'
];

export const getRandomColour = () => {
  const randomIndex = Math.floor(Math.random() * allowedColours.length);
  return allowedColours[randomIndex];
};

export default getRandomColour;
