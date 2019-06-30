const express = require('express');
const axios = require('axios');

const keys = require('../config/keys');

const router = express.Router();

router.get('/', function(req, res) {
  const articleSearchURL =
    'https://api.nytimes.com/svc/search/v2/articlesearch.json';

  axios
    .get(articleSearchURL, {
      params: {
        'api-key': keys.nytApiKey,
        q: 'madagascar+tropical+cyclone+kenneth',
        sort: 'relevance'
      }
    })
    .then(({ data }) => data)
    .then(data => res.json(data.response.docs));
});

module.exports = router;
