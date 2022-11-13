const User = require('../models/UserModel');
const Portfolio = require('../models/PortfolioModel');

class Portfolios {
  // find all the portfolios associated with the current User:
  allPortfolios = async (req, res) => {
    const { userId } = req.params;
    // console.log(userId);
    // const user = await User.findById(userId).populate('portfolios');

    await User.findById(userId)
      .populate('portfolios')
      .then((data) => res.json(data))
      .catch((error) => res.status(404).send('User does not exist'));

    // console.log(user)
    // res.json(user);
    // res.render('portfolios/indexPortfolio', { user });
  };

  // view existing portfolio

  viewPortfolio = async (req, res) => {
    const { userId, portfolioId } = req.params;
    // const portfolio = await Portfolio.findById(portfolioId).populate('stocks');
    // res.json(portfolio);

    await Portfolio.findById(portfolioId)
      .populate('stocks')
      .then((data) => res.json(data))
      .catch((err) => res.status(404).send('Portfolio does not exist'));

    // res.render('portfolios/showPortfolio', { portfolio });
  };

  // create a new portfolio for the current user
  createPortfolio = async (req, res) => {
    const { userId } = req.params;
    const name = req.body;

    if (JSON.stringify(name) === '{}' || name.name === '') {
      return res.status(404).send('Cannot create portfolio with empty name');
    }

    const user = await User.findById(userId);
    const newPortfolio = new Portfolio(name);
    newPortfolio.owner = userId;
    await user.portfolios.push(newPortfolio._id);
    await newPortfolio.save();
    await user.save();
    res.json(newPortfolio);
    // res.redirect(`/portfolio/${userId}`);
  };

  // render edit form
  renderEditForm = async (req, res) => {
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
  updatePortfolio = async (req, res) => {
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
  deletePortfolio = async (req, res) => {
    const { userId, portfolioId } = req.params;

    await Portfolio.findOneAndDelete({ _id: portfolioId })
      .then((data) => res.status(200).json(data))
      .catch((err) => res.status(404).send('Portfolio does not exist'));

    const user = await User.findByIdAndUpdate(userId, {
      $pull: { portfolios: portfolioId },
    });

    // const portfolio = await Portfolio.findOneAndDelete({ _id: portfolioId });

    // req.flash('success', `Successfully deleted ${portfolio.name} portfolio!`);
    // res.redirect(`/portfolio/${userId}`);
  };
}
module.exports = { Portfolios };
