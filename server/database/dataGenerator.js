const fs = require('fs');
const faker = require('faker');
const csv = require('csv-write-stream');

const writer = csv();

// Generate newProducts data
// const images = ['a-bicycle.jpg', 'a-diamond-ring-for-happiness.jpg', 'a-heavy-axe.jpg', 'a-lighted-star-stick.jpg', 'a-spoon-full-of-food.jpg', 'a-sturdy-red-wine-barrel.jpg', 'a-suitcase-for-loading.jpg', 'adhesive-tape.jpg', 'aesthetic-hourglass.jpg', 'all-kinds-of-cameras.jpg', 'all-kinds-of-traditional-chopsticks.jpg', 'apple-computer.jpg', 'apple-mouse.jpg', 'apple-products.jpg', 'apple-watch.jpg', 'baby-ruth.jpg', 'beautiful-glasses.jpg', 'beautiful-headdress-crown.jpg', 'beautiful-pocket-watch.jpg', 'black-business-mens-leather-shoes.jpg', 'bolt-driver.jpg', 'bottled-wine-in-various-colours.jpg', 'bulb.jpg', 'bumblebee-toys.jpg', 'bundles-of-currency-notes.jpg', 'caffeine-free-coca-cola.jpg', 'calculator.jpg', 'camera-lens.jpg', 'camping-tent.jpg', 'canadian-flag-flying.jpg', 'canon-cameras-of-different-models.jpg', 'casual-shoes.jpg', 'chess.jpg', 'chic-guitar.jpg', 'chime-bells-with-a-long-history.jpg', 'chips-ahoy.jpg', 'cinnamon-roll-pop-tart.jpg', 'clocks-alarm-clocks.jpg', 'close-up-of-colour-pencils.jpg', 'coca-cola-clear.jpg', 'coil.jpg', 'colorful-chalk.jpg', 'colorful-dice.jpg', 'colorful-pencils-in-various-colors.jpg', 'colorful-pens.jpg', 'cool-and-temperamental-sunglasses.jpg', 'cool-motorcycle-helmets.jpg', 'crush.jpg', 'dasani.jpg', 'delicate-and-smooth-porcelain.jpg', 'delicate-fashion-headphones.jpg', 'diet-coke-plus.jpg', 'diet-pepsi.jpg', 'elegant-folding-fan.jpg', 'elegant-leaflet-rosewood-handstrings.jpg', 'elegant-purple-clay-pot.jpg', 'exquisite-diamond-ring.jpg', 'exquisite-glasses.jpg', 'exquisite-home-stilllife.jpg', 'facial-cleanser.jpg', 'fanta.jpg', 'fashion-watches.jpg', 'fashionable-and-exquisite-ring.jpg', 'fine-and-beautiful-jewelry-box.jpg', 'fine-guitar.jpg', 'fingertip-gyroscope.jpg', 'firewood.jpg', 'frame-drum-transparent-background-png.jpg', 'fruit-by-the-foot.jpg', 'fruit-roll-ups.jpg', 'gardettos.jpg', 'glass-bead-ornaments.jpg', 'glass-vase-with-flowers.jpg', 'gushers.jpg', 'hammocks-in-the-beach-forest.jpg', 'heart-jewelry.jpg', 'heart-shaped-ornaments.jpg', 'hello-kitty-meowberry-pop-tart.jpg', 'hersheys-kisses.jpg', 'high-end-cigars.jpg', 'hostess-cupcakes.jpg', 'household-bread-machine.jpg', 'jarritos.jpg', 'julmust.jpg', 'junior-mints.jpg', 'kitchen-knife-feature.jpg', 'laptop-keyboard.jpg', 'lays.jpg', 'limca.jpg', 'lock.jpg', 'love-in-the-cup.jpg', 'microscope.jpg', 'mountain-dew.jpg', 'multifunctional-apple-usb-charger.jpg', 'nikon-camera-lens-cap.jpg', 'nutter-butters.jpg', 'old-lunch-box.jpg', 'old-pot.jpg', 'old-sewing-machines.jpg', 'optimus-prime-toys.jpg', 'orangina.jpg', 'outdoor-benches.jpg', 'pentax-camera.jpg', 'pepsi-perfect.jpg', 'piano-part.jpg', 'pink-flamingo.jpg', 'poker-and-color-chips.jpg', 'practical-and-convenient-household-vacuum-cleaner.jpg', 'precious-and-exquisite-agate-bracelet.jpg', 'premium-saltines.jpg', 'rattan-household-goods.jpg', 'reeses-pieces.jpg', 'rendering-of-the-iphone-6.jpg', 'ritz.jpg', 'robo-berry-blast-pop-tart.jpg', 'rold-gold.jpg', 'romantic-valentines-day-candle.jpg', 'round-cute-little-alarm-clock.jp', 'scissors-transparent-background-png.jpg', 'sim-card-chip-for-mobile-phone.jpg', 'simple-and-exquisite-keyboard.jpg', 'smores-pop-tart.jpg', 'snickers.jpg', 'sodastream.jpg', 'sour-patch-kids.jpg', 'stapler.jpg', 'steam-engine.jpg', 'summer-slippers.jpg', 'tab-clear.jpg', 'tableware.jpg', 'teddy-bear-boy.jpg', 'tostitos.jpg', 'toy-car.jpg', 'traditional-light-bulbs.jpg', 'trolli-gummies.jpg', 'twix.jpg', 'umbrella-gallery.jpg', 'unfrosted-strawberry-pop-tart.jpg', 'unique-lighting.jpg', 'unique-sunglasses.jpg', 'use-mobile-tablets.jpg', 'weathervane.jpg', 'white-keyboard.jpg', 'whoppers.jpg', 'wild-berry-pop-tart.jpg', 'wild-tropical-blast-pop-tart.jpg', 'wind-power-generator.jpg', 'womens-high-heels.jpg', 'wonderful-magnifier.jpg', 'yellow-plastic-toy-duck.jpg'];
const numbers = [];
for (let i = 1; i < 994; i += 1) {
  numbers.push(i.toString().padStart(4, '0').concat('.jpg'));
}

const exceptions = ['0013.jpg', '0376.jpg', '0485.jpg', '0566.jpg', '0686.jpg', '0718.jpg', '0775.jpg', '0815.jpg', '0852.jpg', '0879.jpg', '0937.jpg', '0960.jpg'];

const images = numbers.filter((item) => exceptions.indexOf(item) === -1);
const imglen = images.length;

// const newProds = [];
// let i = 1;
// while (newProds.length < 150) {
//   // create array for each product
//   // [productId, name, price, prime, imageUrl, numReviews, avgRating]
//   newProds.push([
//     faker.commerce.productName(),
//     faker.commerce.price(),
//     Math.floor(Math.random() * 2),
//     i > imglen ? `https://d1ivqy59bo7rzu.cloudfront.net/${images[i % imglen]}` : `https://d1ivqy59bo7rzu.cloudfront.net/${images[i]}`,
//     faker.random.number(),
//     (Math.floor((Math.random() * 6) + 5)) / 2,
//   ]);
//   i += 1;
// }

const generate = (count, callback) => {
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
