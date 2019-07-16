const express = require('express');
const axios = require('axios');

const keys = require('../config/keys');

const router = express.Router();

router.get('/', function(req, res) {
  const articleSearchURL =
    'https://api.nytimes.com/svc/search/v2/articlesearch.json';

  const { country, date, name } = req.query;

  const string =
    country +
    ' ' +
    name.replace(/^(.*: )?(.*)( - [A-Za-z]{3} [0-9]{4})$/, '$2');
  const q = string.split(' ').join('+');
  const fiveYearsAgo = new Date(Date.now() - 1000 * 60 * 60 * 24 * 365 * 5)
    .toISOString()
    .replace(/T.*$/, '')
    .replace(/-/g, '');

  console.log(fiveYearsAgo);

  axios
    .get(articleSearchURL, {
      params: {
        'api-key': keys.nytApiKey,
        begin_date: fiveYearsAgo,
        q,
        sort: 'relevance'
      }
    })
    .then(({ data }) => data.response)
    .then(response => {
      const articles = response.docs.map(article => {
        const images = article.multimedia.filter(
          media => media.type === 'image'
        );

        return {
          ...article,
          multimedia:
            images.length > 0 ? 'https://nyt.com/' + images[0].url : ''
        };
      });

      res.json(articles);
    })
    .catch(err => {
      res.send({ error: 'Could not load articles' });
    });
});

module.exports = router;
