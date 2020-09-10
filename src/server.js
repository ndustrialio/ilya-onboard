const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const clientConfig = require('../config');
const ejs = require('ejs');

// initialize the server and configure support for ejs templates
const app = express();
const router = express.Router();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const port = process.env.PORT || 5000;
const env = process.env.NODE_ENV || 'development';

app.use(express.static(path.join(__dirname, '..', 'dist')));
app.use(bodyParser.json());

const locals = {
  htmlWebpackPlugin: {
    options: {
      config: clientConfig
    }
  }
};

router.get('*', (req, res, next) => {
  ejs.renderFile(
    path.join(__dirname, '..', 'dist', 'src/views/index.ejs'),
    locals,
    {
      cache: true,
      escape: (str) => str
    },
    function(err, str) {
      if (err) next(err);
      res.send(str);
    }
  );
});

app.use(router);

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, (err) => {
    if (err) {
      return console.error(err); // eslint-disable-line no-console
    }
    console.info(`Server running on http://localhost:${port} [${env}]`); // eslint-disable-line no-console
  });
}

module.exports = app;
