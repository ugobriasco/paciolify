const { getAccessToken } = require("../bank-account");
const n26 = require("../api/n26");

/*g etTransactionHistory
 * MODES = expand, reduce
 * GROUP_BY = name, category, category_and_name
 *
 */

// Set default timeframe to call the tx history
const DEFAULT_TIMEFRAME_MS = 2628000000; //30 Days

// Main function
const getTxHistory = async ({ userID, from, to, groupBy, mode }) => {
  if (!userID) return false;

  const now = new Date();

  const leftLimit = from ? from : now.valueOf() - DEFAULT_TIMEFRAME_MS;
  const rightLimit = to ? to : now.valueOf();

  console.log("\x1b[31m%s\x1b[0m", leftLimit, rightLimit);

  return getAccessToken(userID)
    .then(accessToken =>
      n26
        .getTxHistory({ accessToken, from: leftLimit, to: rightLimit })
        .then(list => {
          switch (groupBy) {
            case "category":
              return sortByCategory(list, mode);
              break;
            case "name":
              return sortByName(list, mode);
              break;
            case "category_and_name":
              return sortByCategoryAndName(list, mode);
              break;
            default:
              return sizeEvents(list, mode);
          }
        })
    )
    .then(data => ({
      from: new Date(leftLimit),
      to: new Date(rightLimit),
      data
    }));
};

// // Provide a simplified view of a single event
const simplifyEvent = event => {
  const {
    amount,
    currencyCode,
    merchantName,
    mcc,
    recurring,
    merchantCity,
    category,
    referenceText,
    partnerName,
    confirmed
  } = event;

  return {
    amount,
    currencyCode,
    merchantName,
    mcc,
    recurring,
    merchantCity,
    category,
    referenceText,
    partnerName,
    confirmed: new Date(confirmed)
  };
};

// For objects - if mode == expand then return the full event, otherwhise apply simplifyEvent
const sizeEvent = (event, mode) =>
  mode === "expand" ? event : simplifyEvent(event);

// For arrays - if mode == expand then return the full event, otherwhise apply simplifyEvent
const sizeEvents = (list, mode) => list.map(event => sizeEvent(event, mode));

// Reduce events in the core amount
const reduceEvents = list =>
  list.map(event => event.amount).reduce((acc, val) => acc + val);

// Group a list of transactions by N26 Category
const sortByCategory = (list, mode) => {
  let sortedList = {};
  list.forEach(event => {
    const { category } = event;
    const _event = sizeEvent(event, mode);
    if (!sortedList[category]) {
      sortedList[category] = [_event];
    } else {
      sortedList[category].push(_event);
    }
  });

  if (mode === "reduce") {
    Object.keys(sortedList).forEach(
      key => (sortedList[key] = reduceEvents(sortedList[key]))
    );
  }

  return sortedList;
};

// Group a list of transactions by Name of the merchant
const sortByName = (list, mode) => {
  let sortedList = {};
  list.forEach(event => {
    const { merchantName, partnerName } = event;
    const _event = sizeEvent(event, mode);
    const key = merchantName || partnerName;
    if (!sortedList[key]) {
      sortedList[key] = [_event];
    } else {
      sortedList[key].push(_event);
    }
  });

  if (mode === "reduce") {
    Object.keys(sortedList).forEach(
      key => (sortedList[key] = reduceEvents(sortedList[key]))
    );
  }

  return sortedList;
};

// Group the list of transaction by category and subsequently name
const sortByCategoryAndName = (list, mode) => {
  const sortedList = sortByCategory(list, "expand");
  Object.keys(sortedList).forEach(
    key => (sortedList[key] = sortByName(sortedList[key], mode))
  );
  return sortedList;
};

module.exports = getTxHistory;
