/*
 * Compare cyles
 *
 */
const transactions = require("./transaction");

const NOW = new Date();
const ONE_DAY = 86400000;
const ONE_WEEK = ONE_DAY * 7;
const ONE_MONTH = ONE_DAY * 30;
const THREE_MONTHS = ONE_DAY * 90;
const ONE_YEAR = ONE_DAY * 365;

const _callTransactions = (userID, from, to) => {
  return transactions({
    userID,
    from,
    to,
    groupBy: "category_and_name",
    mode: "reduce"
  });
};

const _setSpan = mode => {
  if (mode == "monthly") {
    return ONE_MONTH;
  }

  if (mode == "quarterly") {
    return THREE_MONTHS;
  }

  if (mode == "yearly") {
    return ONE_YEAR;
  }

  return ONE_WEEK;
};

const balance = (userID, cycles, mode) => {
  // Define the time windows used for collecting statistics

  const span = _setSpan(mode);

  let promises = [];
  for (let i = 0; i < cycles; i++) {
    const from = NOW - span * i - span;
    const to = NOW - span * i;
    promises.push(_callTransactions(userID, from, to));
  }

  return Promise.all(promises.reverse());
};

module.exports = balance;
