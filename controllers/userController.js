const User = require('../models/UserModel');
const Stock = require('../models/StockModel');

module.exports.renderHome = async (req, res) => {
  const stocks = await Stock.find({});
  console.log(req.user);
  const user = await User.findById(req.user._id).populate('portfolios');
  
  res.render('home', { stocks, user });
};

module.exports.register = async (req, res) => {
  try {
    const { email, password, username } = req.body.user;
    // Create new user instance by passing the email and the username
    const newUser = new User({ email, username });
    // Takes the the new user and the password
    const registeredUser = await User.register(newUser, password);
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      } else {
        req.flash('success', `Welcome ${registeredUser.username}!`);
        res.redirect('/');
      }
    });
  } catch (e) {
    req.flash('error', e.message);
    res.redirect('/register');
  }
};

module.exports.login = async (req, res) => {
  req.flash('success', `Welcome back ${req.user.username}`);
  const redirectUrl = req.session.returnTo || '/';
  delete req.session.returnTo;
  res.redirect(redirectUrl);
};

module.exports.logout = (req, res) => {
  const username = req.user.username;
  req.logout(function (err) {
    req.flash('success', `See you soon ${username}!`);
    res.redirect('/');
  });
};

module.exports.renderRegister = (req, res) => {
  res.render('users/register');
};

module.exports.renderLogin = (req, res) => {
  res.render('users/login');
};
