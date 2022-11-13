const express = require('express');
const router = express.Router();

const { isLoggedIn, isOwner, isSameUser } = require('../middleware');
const { Portfolios } = require('../controllers/portfolioController');
const portfolios = new Portfolios();
const catchAsync = require('../utils/catchAsync');


// starts with /portfolio

router
  .route('/:userId')
  // .get(isLoggedIn, isSameUser, portfolios.allPortfolios)
  .get(portfolios.allPortfolios)
  .post(isLoggedIn, portfolios.createPortfolio);

router
  .route('/:userId/:portfolioId')
  .get(isLoggedIn, isOwner, portfolios.viewPortfolio)
  .put(isLoggedIn, isOwner, portfolios.updatePortfolio)
  .delete(isLoggedIn, isOwner, portfolios.deletePortfolio);

router
  .route('/:userId/:portfolioId/edit')
  .get(isLoggedIn, isOwner, portfolios.renderEditForm);

module.exports = router;
