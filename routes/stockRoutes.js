const express = require('express');
const router = express.Router();

const { isLoggedIn, isOwner } = require('../middleware');
const stockController = require('../controllers/stockController');
// starts with /stock

router.route('/').get(stockController.getAllStocks);

router
  .route('/:stockId/:userId')
  .get(isLoggedIn, stockController.viewStock)
  .post(isLoggedIn, stockController.addStock);

router
  .route('/remove/:stockId/:portfolioId/:userId')
  .delete(isLoggedIn, stockController.removeStock);

module.exports = router;
