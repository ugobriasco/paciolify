const { getAccessToken } = require("./bank-account-auth");
const n26 = require("../api/n26");

// getTransactionHistory
const getTxHistory = async ({ userID, from, to, groupBy }) => {
  if (!userID) return false;

  const now = new Date();

  const leftLimit = from
    ? new Date(from).valueOf()
    : now.valueOf() - 2628000000; //30 Days
  const rightLimit = to ? new Date(to).valueOf() : now.valueOf();

  return getAccessToken(userID).then(accessToken =>
    n26.getTxHistory({ accessToken, from: leftLimit, to: rightLimit })
  );
  // getTXHistory aggregated by name from date to date
  // getTXHistory aggregated by mcc from date to date
};

// Group a list of transactions by Name of the merchant
const groupByName = list => {};

// Group a list of transactions by MCC
const groupByMcc = list => {};

module.exports = getTxHistory;
