const User = require('../models/UserModel');
const Portfolio = require('../models/PortfolioModel');

// find all the portfolios associated with the current User:
module.exports.allPortfolios = async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId).populate('portfolios');
  res.render('portfolios/indexPortfolio', { user });
};

// view existing portfolio
module.exports.viewPortfolio = async (req, res) => {
  const { userId, portfolioId } = req.params;
  const portfolio = await Portfolio.findById(portfolioId);
  res.render('portfolios/showPortfolio', { portfolio });
};

// create a new portfolio for the current user
module.exports.createPortfolio = async (req, res) => {
  const { userId } = req.params;
  const name = req.body.portfolio;
  const user = await User.findById(userId);
  const newPortfolio = new Portfolio(name);
  newPortfolio.owner = userId;
  await user.portfolios.push(newPortfolio._id);
  await newPortfolio.save();
  await user.save();
  res.redirect(`/portfolio/${userId}`);
};

// render edit form
module.exports.renderEditForm = async (req, res) => {
  const { userId, portfolioId } = req.params;
  const portfolio = await Portfolio.findById(portfolioId);
  if (!portfolio) {
    req.flash('error', 'Portfolio not found!');
    return res.redirect(`/portfolio/${userId}`);
  }
  res.render(`portfolios/editPortfolio`, { portfolio });
};

// update exisiting portfolio
// can only change the name of the portfolio
// adding and deleting stocks will be in stockController
module.exports.updatePortfolio = async (req, res) => {
  const { userId, portfolioId } = req.params;
  const portfolio = await Portfolio.findByIdAndUpdate(
    portfolioId,
    req.body.portfolio
  );
  await portfolio.save();
  req.flash('success', 'Successfully updated portfolio');
  res.redirect(`/portfolio/${userId}/${portfolioId}`);
};

// delete existing portfolio
module.exports.deletePortfolio = async (req, res) => {
  const { userId, portfolioId } = req.params;
  const user = await User.findByIdAndUpdate(userId, {
    $pull: { portfolios: portfolioId },
  });
  const portfolio = await Portfolio.findOneAndDelete({ _id: portfolioId });
  req.flash('success', `Successfully deleted ${portfolio.name} portfolio!`);
  res.redirect(`/portfolio/${userId}`);
};
