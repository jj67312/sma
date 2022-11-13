let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');

// Assertion style
chai.should();

chai.use(chaiHttp);

describe('Portfolio API', () => {
  // GET all portfolios:
  describe('GET /portfolio/636831a68bea22ab802e2827', () => {
    it('It should get all the portfolios', (done) => {
      chai
        .request(server)
        .get('/portfolio/636831a68bea22ab802e2827')
        .end((err, res) => {
          console.log('Error = ', err);
          console.log('Response = ', res.text);
          res.should.have.status(200);
          // res.should.have.property('_id');
          // res.should.have.property('portfolios');
          // res.should.have.property('username');
          res.body.should.be.a('object');
          done();
        });
    });
  });
  // POST new portfolio
  // DELETE portfolio
  // PUT update portfolio
});
