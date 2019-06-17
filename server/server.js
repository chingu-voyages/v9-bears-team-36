const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

const PORT = process.env.PORT || 4000;
const ENV = process.env.NODE_ENV || 'development';

const reliefWeb = require('./routes/reliefWeb');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/relief', reliefWeb);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('../client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, () =>
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${PORT} in ${ENV} mode. Wait for compile...`)
);
