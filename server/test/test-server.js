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
        expect(res.body).to.have.lengthOf.greaterThan(0);
        expect(res.body[0]).to.have.property('countries');
        expect(res.body[0]).to.have.property('description');
        expect(res.body[0]).to.have.property('id');
        expect(res.body[0]).to.have.property('name');
        expect(res.body[0]).to.have.property('types');
        done();
      });
  });
});

describe('/nyt', function() {
  it('should return 10 articles on /', function(done) {
    chai
      .request(server)
      .get('/nyt')
      .query({
        name: 'DR Congo: Cholera and Measles Outbreaks - Jan 2013',
        country: 'Democratic Republic of the Congo'
      })
      .end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.have.lengthOf(10);
        expect(res.body[0]).to.have.property('multimedia');
        expect(res.body[0]).to.have.property('web_url');
        expect(res.body[0]).to.have.nested.property('headline.main');
        done();
      });
  });
});
