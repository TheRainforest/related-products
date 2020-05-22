const fs = require('fs');
const faker = require('faker');
const csv = require('csv-write-stream');

const writer = csv();

const numbers = [];
for (let i = 1; i < 994; i += 1) {
  numbers.push(i.toString().padStart(4, '0').concat('.jpg'));
}

const exceptions = ['0013.jpg', '0376.jpg', '0485.jpg', '0566.jpg', '0686.jpg', '0718.jpg', '0775.jpg', '0815.jpg', '0852.jpg', '0879.jpg', '0937.jpg', '0960.jpg'];

const images = numbers.filter((item) => exceptions.indexOf(item) === -1);
const imglen = images.length;

const generate = (count, callback) => {
  console.time('finished in');
  const stream = fs.createWriteStream('rainforest-related-items.csv');

  stream.on('error', (err) => {
    console.log(err);
  });
  stream.on('finish', () => {
    console.log('Data finished writing to file.');
  });

  writer.pipe(stream);
  // for (let i = 0; i < count; i += 1) {
  let i = count;
  const createRow = () => {
    writer.write({
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      prime: Math.floor(Math.random() * 2),
      imageUrl: i > imglen ? `https://sdc-rainforest-related-items.s3.us-east-1.amazonaws.com/${images[i % imglen]}` : `https://sdc-rainforest-related-items.s3.us-east-1.amazonaws.com//${images[i]}`,
      numReviews: faker.random.number(),
      avgRating: (Math.floor((Math.random() * 6) + 5)) / 2,
    });
  };
  let keepCount = 0;
  const makeWrite = () => {
    let ok = true;
    do {
      i -= 1;
      keepCount += 1;
      if (i === 0) {
        createRow();
        console.time('finished in');
        callback(keepCount);
      } else {
        ok = writer.write({
          name: faker.commerce.productName(),
          price: faker.commerce.price(),
          prime: Math.floor(Math.random() * 2),
          imageUrl: i > imglen ? `https://sdc-rainforest-related-items.s3.us-east-1.amazonaws.com/${images[i % imglen]}` : `https://sdc-rainforest-related-items.s3.us-east-1.amazonaws.com//${images[i]}`,
          numReviews: faker.random.number(),
          avgRating: (Math.floor((Math.random() * 6) + 5)) / 2,
        });
      }
    } while (i > 0 && ok);
    if (i > 0) {
      stream.once('drain', () => {
        // console.log('The drain is emptied.');
        makeWrite();
      });
    }
  };
  makeWrite();
};

generate(10000000, (queue) => {
  console.log('Finished at', queue);
});
