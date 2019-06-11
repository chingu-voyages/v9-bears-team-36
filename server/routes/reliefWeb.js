const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/', function(_, res) {
  const allDisastersURL =
    'https://api.reliefweb.int/v1/disasters?filter[field]=status&filter[value]=current&limit=100';
  const oneDisasterURL = 'https://api.reliefweb.int/v1/disasters/';

  axios
    .get(allDisastersURL)
    .then(({ data }) => {
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
                  lon: country.location.lon
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
    });
});

module.exports = router;
