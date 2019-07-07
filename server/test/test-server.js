const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const expect = chai.expect;

chai.use(chaiHttp);

describe('/relief', function() {
  it('should return disaster info on /', function(done) {
    chai
      .request(server)
      .get('/relief')
      .end(function(err, res) {
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe('/nyt', function() {
  it('should return articles on /', function(done) {
    chai
      .request(server)
      .get('/nyt')
      .query({
        name: 'DR Congo: Cholera and Measles Outbreaks - Jan 2013',
        country: 'Democratic Republic of the Congo'
      })
      .end(function(err, res) {
        expect(res).to.have.status(200);
        done();
      });
  });
});
