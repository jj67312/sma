let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');

// Assertion style
chai.should();

chai.use(chaiHttp);

let userId = '636831a68bea22ab802e2827';
let portfolioId = '6370e9916b46c829409d67a5';

describe('Portfolio API', () => {
  // get all portfolios:
  describe('GET /portfolio/:userId', () => {
    it('It should get all the portfolios', (done) => {
      chai
        .request(server)
        .get('/portfolio/' + userId)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('_id');
          res.body.should.have.property('portfolios');
          res.body.should.have.property('username');
          done();
        });
    });

    it('It should not get the portfolios for user that does not exist', (done) => {
      chai
        .request(server)
        .get('/portfolio/123')
        .end((err, res) => {
          res.should.have.status(404);
          res.text.should.be.eq('User does not exist');
          done();
        });
    });
  });

  // get portfolio by id:
  describe('GET /portfolio/:userId/:portfolioId', () => {
    it('It should get the portfolio by id', (done) => {
      chai
        .request(server)
        .get('/portfolio/' + userId + '/' + portfolioId)
        .end((err, res) => {
          res.body.should.have.property('_id');
          res.body.should.have.property('name');
          res.body.should.have.property('stocks');
          res.body.should.have.property('owner');
          done();
        });
    });

    it('It should get the portfolio if portfolio does not exists', (done) => {
      chai
        .request(server)
        .get('/portfolio/' + userId + '/123')
        .end((err, res) => {
          res.should.have.status(404);
          res.text.should.be.eq('Portfolio does not exist');
          done();
        });
    });
  });

  // POST new portfolio
  describe('POST /portfolio/:userId', () => {
    it('It should create a new portfolio', (done) => {
      let name = 'Test-portfolio';
      chai
        .request(server)
        .post('/portfolio/' + userId)
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({ name })
        .end((err, res) => {
          // console.log(res.body)
          res.body.should.have.property('_id');
          res.body.should.have.property('name');
          res.body.should.have.property('owner').eql(userId);
          res.body.should.have.property('stocks');
          done();
        });
    });

    it('It should not create new portfolio if details are missing', (done) => {
      let name;
      chai
        .request(server)
        .post('/portfolio/' + userId)
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({ name })
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });

  // DELETE portfolio
  describe('DELETE /portfolio/:userId/:portfolioId', () => {
    it('It should delete an existing portfolio', (done) => {
      chai
        .request(server)
        .delete('/portfolio/' + userId + '/' + '6370e99a6b46c829409d67b9')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    it('It should not delete a portfolio which does not exist', (done) => {
      chai
        .request(server)
        .delete('/portfolio/' + userId + '/123')
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
});
