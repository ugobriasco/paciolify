const auth = {};

auth.getLogin = (req, res) => {
  res.render("login");
};

auth.postLogin = (req, res) => {
  res.redirect("/me/account");
};

auth.getSignup = (req, res) => {
  res.render("signup");
};

auth.postSignup = (req, res) => {
  res.redirect("/me/account");
};

auth.postLogout = (req, res) => {
  res.redirect("/login");
};

module.exports = auth;
