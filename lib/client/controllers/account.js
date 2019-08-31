const util = require("util");
const debug = util.debuglog("client");

const { user: userData } = require("../../data");
const { addBankAccount } = require("../../bank-account/bank-account-manage");

// TODO: move cookies handler as middleware
const cookieOpt = {
  maxAge: 1000 * 60 * 15, // would expire after 15 minutes
  httpOnly: false, // If true, The cookie only accessible by the web server
  signed: false // if true, Indicates if the cookie should be signed
};

const getAccount = (req, res) => {
  const userID = req.cookies.user;

  debug("unsigned", req.cookies);
  debug("signed", req.signedCookies);

  return userData
    .getUserById(userID)
    .then(user => {
      debug(user);

      const email = user.local.email;
      const role = user.role;
      const groups = user.groups.length;
      const linkedBankName = user.bank_account
        ? user.bank_account.bankName
        : "";
      const linkedIBAN = user.bank_account ? user.bank_account.iban : "";

      res.cookie("user", userID, cookieOpt);
      res.render("account", {
        email,
        role,
        groups,
        userID,
        linkedBankName,
        linkedIBAN
      });
    })
    .catch(err => {
      debug("Error on renderin /account", err);
      res.cookie("user", userID, cookieOpt);
      res.render("account", {
        email: "",
        role: "",
        groups: [],
        userID: "",
        linkedBankName: "",
        linkedIBAN: ""
      });
    });
};

const postAccount = (req, res) => {
  debug("unsigned", req.cookies);
  debug("signed", req.signedCookies);

  const userID = req.cookies.user;
  const { email, password, bankName } = req.body;

  addBankAccount({ email, password, userID })
    .then(_res => {
      res.cookie("user", userID, cookieOpt);
      res.redirect("/me/account");
    })
    .catch(err => {
      console.log("ERROR", err);
      res.cookie("user", userID, cookieOpt);
      res.redirect("/me/account");
    });
};

module.exports = { getAccount, postAccount };
