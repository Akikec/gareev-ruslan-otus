const fs = require('fs');
const getRandomInteger = (min, max) => Math.floor(min + Math.random() * (max - min + 1));
const calcSizeOfNumbersArrayMB = (arr) => arr.length*9/Math.pow(1024, 2);
const calcFileSizeMB = (fileName) => (fs.statSync(fileName)['size'] / Math.pow(1024, 2)).toFixed(2);
module.exports = {calcFileSizeMB, getRandomInteger, calcSizeOfNumbersArrayMB}