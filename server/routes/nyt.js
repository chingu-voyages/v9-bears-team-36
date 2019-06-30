const express = require('express');
const axios = require('axios');

const keys = require('../config/keys');

const router = express.Router();

router.get('/', function(req, res) {
  const articleSearchURL =
    'https://api.nytimes.com/svc/search/v2/articlesearch.json';

  const { country, name } = req.query;

  const string =
    country +
    ' ' +
    name.replace(/^(.*: )?(.*)( - [A-Za-z]{3} [0-9]{4})$/, '$2');
  const q = string.split(' ').join('+');

  axios
    .get(articleSearchURL, {
      params: {
        'api-key': keys.nytApiKey,
        q,
        sort: 'relevance'
      }
    })
    .then(({ data }) => data)
    .then(data => res.json(data.response.docs));
});

module.exports = router;
