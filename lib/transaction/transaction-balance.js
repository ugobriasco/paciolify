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

const _callTransactions = (userID, from, to) => {
  return transactions({
    userID,
    from,
    to,
    groupBy: "category_and_name",
    mode: "reduce"
  });
};

//WoW
const wowStats = (userID, cycles) => {
  let promises = [];

  for (let i = 0; i < cycles; i++) {
    const from = NOW - ONE_WEEK * i - ONE_WEEK;
    const to = NOW - ONE_WEEK * i;

    //const from = new Date(_from);
    //const to = new Date(_to);

    promises.push(_callTransactions(userID, from, to));
  }

  return Promise.all(promises);
};

//MoM

//QoQ

module.exports = { wowStats };
