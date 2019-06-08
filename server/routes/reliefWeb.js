const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', function(_, res) {
  const allDisastersURL = `https://api.reliefweb.int/v1/disasters?filter[field]=status&filter[value]=current&limit=100`;
  const oneDisasterURL = `https://api.reliefweb.int/v1/disasters/`;

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
            primary_country: {
              id: fields.primary_country.id,
              location: {
                lat: fields.primary_country.location.lat,
                lon: fields.primary_country.location.lon
              },
              name: fields.primary_country.name,
              type: fields.primary_type.name,
              type_id: fields.primary_type.id
            },
            secondary_countries: fields.country
              .filter(country => {
                if (country.id === fields.primary_country.id) {
                  return false;
                }
                return true;
              })
              .map(country => {
                return {
                  country: country.name,
                  id: country.id,
                  location: {
                    lat: country.location.lat,
                    lon: country.location.lon
                  }
                };
              }),
            secondary_types: fields.type
              .filter(type => {
                if (type.primary) {
                  return false;
                }
                return true;
              })
              .map(type => {
                return {
                  id: type.id,
                  type: type.name
                };
              }),
            status: fields.status
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
