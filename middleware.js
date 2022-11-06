const Portfolio = require('./models/PortfolioModel');

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash('error', 'You must be signed in!');
    return res.redirect('/login');
  }
  next();
};

module.exports.isOwner = async (req, res, next) => {
  const { userId, portfolioId } = req.params;
  const portfolio = await Portfolio.findById(portfolioId);
  console.log(userId);
  console.log(portfolio);
  if (!portfolio.owner.equals(req.user._id)) {
    req.flash('error', 'You do not have permission to do that!');
    return res.redirect(`/portfolio/${userId}/${portfolioId}`);
  }
  next();
};
