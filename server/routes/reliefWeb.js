const express = require('express');
const axios = require('axios');
const axiosRetry = require('axios-retry');

const router = express.Router();

router.get('/', function(_, res) {
  const allDisastersURL =
    'https://api.reliefweb.int/v1/disasters?filter[field]=status&filter[value]=current&limit=100';
  const oneDisasterURL = 'https://api.reliefweb.int/v1/disasters/';

  axios
    .get(allDisastersURL, {
      axiosRetry: { retryDelay: axiosRetry.exponentialDelay }
    })
    .then(({ data }) => {
      if (data.data.length === undefined) {
        res.send({ error: 'Could not load disasters' });
      }
      return data.data.map(disaster => {
        return disaster.id;
      });
    })
    .then(disasterIdList => {
      const getResults = async () => {
        const disasters = disasterIdList.map(async disasterId => {
          const response = await axios.get(oneDisasterURL + disasterId);
          const { fields } = response.data.data[0];
          return {
            date: fields.date.created.slice(0, 10),
            description: fields.description,
            id: fields.id,
            name: fields.name,
            countries: fields.country.map(country => {
              return {
                id: country.id,
                location: {
                  lat: country.location.lat,
                  lng: country.location.lon
                },
                name: country.name,
                primary: country.primary ? country.primary : false
              };
            }),
            types: fields.type.map(type => {
              return {
                id: type.id,
                type: type.name,
                primary: type.primary ? type.primary : false
              };
            })
          };
        });

        const results = await Promise.all(disasters);
        return results;
      };

      return getResults();
    })
    .then(results => {
      res.json(results);
    })
    .catch(error => {
      if (error.response) {
        // Non 2xx status code
        console.log('Error caught in catch', error); // eslint-disable-line no-console
        res.send({ error: 'Could not load disasters' });
      } else if (error.request) {
        // Successful request, no response
        console.log(error.request); // eslint-disable-line no-console
        res.send({ error: 'Could not load disasters' });
      } else {
        // Unsuccessful request
        console.log('Error', error.message); // eslint-disable-line no-console
        res.send({ error: 'Could not load disasters' });
      }
      console.log(error.config); // eslint-disable-line no-console
    });
});

module.exports = router;
