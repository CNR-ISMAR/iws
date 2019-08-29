function normalize(arr) {
  return arr.map(function (item) {
    if (item == "NaN")
      return null
    return item
  })
}

function getMax(arr) {
  let len = arr.length;
  let max = -Infinity;

  while (len-- >= 0) {
    max = arr[len] > max && arr[len] != null ? arr[len] : max;
    //console.log(max)
  }
  return max;
}

function getMin(arr) {
  let len = arr.length;
  let min = +Infinity;

  while (len-- >= 0) {
    min = arr[len] < min && arr[len] != null ? arr[len] : min;
    //console.log(min)
  }
  return min;
}

const PNG = require('pngjs').PNG;
const fs = require('fs');

const data = JSON.parse(fs.readFileSync('TMES_waves_20190826-010000.json')); // + e - con -270
// const data = JSON.parse(fs.readFileSync('UV270.json')); // + e - con -270
// const data = JSON.parse(fs.readFileSync('UV.json')); // + e -
// const data = JSON.parse(fs.readFileSync('3857_orig.json'));
const name = process.argv[2];
let u = data[0];
let v = data[1];

u.data = normalize(u.data)
v.data = normalize(v.data)
// u.data = u.data.map(function(x){return x*-1})
// v.data = v.data.map(function(x){return x*-1})

u.minimum = getMin(u.data)
u.maximum = getMax(u.data)
v.minimum = getMin(v.data)
v.maximum = getMax(v.data)

console.log("data values: ", u.minimum, u.maximum, v.minimum, v.maximum)

const width = u.header.nx;
const height = u.header.ny;
// const height = u.header.ny - 1;


//console.log(u)
console.log("png dimensions: ", width, height)

const png = new PNG({
  colorType: 6,
  filterType: 4,
  width: width,
  height: height
});

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const i = (y * width + x) * 4;
    const k = y * width + x;
    if (u.data[k] && v.data[k]) {
      png.data[i + 0] = Math.floor(255 * (u.data[k] - u.minimum) / (u.maximum - u.minimum));
      png.data[i + 1] = Math.floor(255 * (v.data[k] - v.minimum) / (v.maximum - v.minimum));
      // png.data[i + 1] = Math.floor(255 * (u.data[k] - u.minimum) / (u.maximum - u.minimum));
      // png.data[i + 0] = Math.floor(255 * (v.data[k] - v.minimum) / (v.maximum - v.minimum));
      png.data[i + 2] = 0;
      png.data[i + 3] = 255;
    }
    // else {
    //   png.data[i + 0] = 0
    //   png.data[i + 1] = 0
    //   png.data[i + 2] = 0
    //   png.data[i + 3] = 0
    // }
  }
}

png.pack().pipe(fs.createWriteStream(name + '.png'));

fs.writeFileSync(name + '.json', JSON.stringify({
  source: 'https://iws.ismar.cnr.it/',
  date: u.header.refTime,
  width: width,
  height: height,
  max_x: u.maximum,
  max_y: v.maximum,
  min_x: u.minimum,
  min_y: v.minimum,
  lo1: u.header.lo1,
  la1: u.header.la1,
  lo2: u.header.lo2,
  la2: u.header.la2,
  // "lo1":12.21,
  // "la1":45.85,
  resolution: 1024.0,
  error: false
}, null, 2) + '\n');

function formatDate(date, time) {
  return date.substr(0, 4) + '-' + date.substr(4, 2) + '-' + date.substr(6, 2) + 'T' +
    (time < 10 ? '0' + time : time) + ':00Z';
}
