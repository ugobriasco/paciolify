const { userService } = require("../services");

// TODO: move cookies handler as middleware
const cookieOpt = {
  maxAge: 1000 * 60 * 15, // would expire after 15 minutes
  httpOnly: false, // If true, The cookie only accessible by the web server
  signed: false // if true, Indicates if the cookie should be signed
};

const ctrl = {};

ctrl.getLogin = (req, res) => {
  res.render("login");
};

ctrl.postLogin = (req, res) => {
  const { email, password } = req.body;
  userService
    .authenticate(email, password)
    .then(data => {
      const { user, accessToken } = data;
      const userID = user._id;
      res.cookie("user", userID, cookieOpt);
      res.cookie("accessToken", accessToken, cookieOpt);
      res.redirect("/me");
    })
    .catch(err => {
      console.log(err.response.status);
      res.render("login");
    });
};

ctrl.getSignup = (req, res) => {
  res.render("signup");
};

ctrl.postSignup = (req, res) => {
  const { email, password1, password2 } = req.body;
  if (password1 != password2) {
    res.render("signup");
  } else {
    return userService
      .registerUser(email, password1)
      .then(data => {
        const { user, accessToken } = data;
        const userID = user._id;
        res.cookie("user", userID, cookieOpt);
        res.cookie("accessToken", accessToken, cookieOpt);
        res.redirect("/me/account");
      })
      .catch(err => {
        console.log(err.response.status);
        res.render("signup");
      });
  }
};

ctrl.postLogout = (req, res) => {
  res.cookie("user", "", cookieOpt);
  res.cookie("accessToken", "", cookieOpt);
  res.redirect("/login");
};

module.exports = ctrl;
