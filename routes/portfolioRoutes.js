const express = require('express');
const router = express.Router();

const { isLoggedIn, isOwner } = require('../middleware');
const portfoilioControllers = require('../controllers/portfolioController');

// starts with /portfolio

router
  .route('/:userId')
  .get(isLoggedIn, portfoilioControllers.allPortfolios)
  .post(isLoggedIn, portfoilioControllers.createPortfolio);

router
  .route('/:userId/:portfolioId')
  .get(isLoggedIn, isOwner, portfoilioControllers.viewPortfolio)
  .put(isLoggedIn, isOwner, portfoilioControllers.updatePortfolio)
  .delete(isLoggedIn, isOwner, portfoilioControllers.deletePortfolio);

router
  .route('/:userId/:portfolioId/edit')
  .get(isLoggedIn, isOwner, portfoilioControllers.renderEditForm);

module.exports = router;
