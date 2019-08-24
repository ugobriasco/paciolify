const me = (req, res) => {
  const userID = "5d489f64cd6ba32db3517503";

  let options = {
    maxAge: 1000 * 60 * 15, // would expire after 15 minutes
    httpOnly: false, // If true, The cookie only accessible by the web server
    signed: false // if true, Indicates if the cookie should be signed
  };

  // TODO: move cookies handler as middleware
  res.cookie("user", userID, options);
  res.render("me", { userID });
};

module.exports = me;
