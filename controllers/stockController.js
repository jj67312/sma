const Stock = require('../models/StockModel');
const Portfolio = require('../models/PortfolioModel');
const User = require('../models/UserModel');

module.exports.getAllStocks = async (req, res) => {
  const stocks = await Stock.find({});
  res.json(stocks);
};

module.exports.viewStock = async (req, res) => {
  const { stockId, userId } = req.params;
  const user = await User.findById(userId).populate('portfolios');
  const stock = await Stock.findById(stockId);
  res.render('stocks/viewStock', { user, stock });
};

module.exports.addStock = async (req, res) => {
  try {
    const { stockId, userId } = req.params;
    const { portfolioName } = req.body;
    const portfolio = await Portfolio.findOne({ name: portfolioName });
    portfolio.stocks.push(stockId);
    await portfolio.save();
    res.redirect(`/portfolio/${userId}/${portfolio._id}`);
  } catch (err) {
    req.flash('error', 'Stock already exists in portfolio!');
  }
};

// portfolio, stock
module.exports.removeStock = async (req, res) => {
  const { stockId, portfolioId, userId } = req.params;
  const user = await User.findById(userId);
  const stock = await Stock.findById(stockId);
  const portfolio = await Portfolio.findByIdAndUpdate(portfolioId, {
    $pull: { stocks: stockId },
  });
  req.flash('success', `${stock.name} removed from ${portfolio.name}`);
  res.redirect(`/portfolio/${user._id}`);
};
