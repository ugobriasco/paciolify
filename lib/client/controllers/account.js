const { readBankAccount } = require("../../bank-account/bank-account-manage");

const account = (req, res) => {
  const userID = req.cookies.user;

  console.log("unsigned", req.cookies);
  console.log("signed", req.signedCookies);

  if (userID) {
    readBankAccount(userID).then(res => console.log("res", res));
  }

  // TODO: move cookies handler as middleware
  const options = {
    maxAge: 1000 * 60 * 15, // would expire after 15 minutes
    httpOnly: true, // If true, The cookie only accessible by the web server
    signed: true // if true, Indicates if the cookie should be signed
  };
  res.cookie("signedUser", userID, options);
  res.render("account", {});
};

module.exports = account;
