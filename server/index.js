require('newrelic');
const app = require('./app.js');

const port = process.env.PORT || 3003;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
