const random = require("canvas-sketch-util/random");

const arrayFromNumber = (anyNumber) => {
  return Array.from(new Array(anyNumber).keys());
};

const rangeRandom = (max, min) => {
  return Math.round(Math.random() * (max - min) + min);
};

module.exports = {
  arrayFromNumber,
  rangeRandom,
};
