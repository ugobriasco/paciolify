const util = require("util");
const debug = util.debuglog("client");

const { readBankAccount } = require("../../bank-account/bank-account-manage");
const { user: userData } = require("../../data");

const account = (req, res) => {
  const userID = req.cookies.user;

  debug("unsigned", req.cookies);
  debug("signed", req.signedCookies);

  // if (userID) {
  //   userData.getUserById(userID).then(res => console.log("res", res));
  // }

  // TODO: move cookies handler as middleware
  const options = {
    maxAge: 1000 * 60 * 15, // would expire after 15 minutes
    httpOnly: false, // If true, The cookie only accessible by the web server
    signed: false // if true, Indicates if the cookie should be signed
  };

  return userData.getUserById(userID).then(user => {
    debug(user);

    const email = user.local.email;
    const role = user.role;
    const groups = user.groups.length;
    const linkedBankName = user.bank_account.name;
    const linkedIBAN = user.bank_account.iban;

    res.cookie("user", userID, options);
    res.render("account", {
      email,
      role,
      groups,
      userID,
      linkedBankName,
      linkedIBAN
    });
  });
};

module.exports = account;
