let balance;
const currency = "€";
const COLORS = [
  "#FFF05A",
  "#FFD25A",
  "#FFAA5A",
  "#FF785A",
  "#F06449",
  "#FFC759",
  "#FFA959",
  "#FF7F59",
  "#FF5964",
  "#EF4755",
  "#CC5803",
  "#47A9EF"
];

// Fetch data a soon as the page is loaded
document.addEventListener("DOMContentLoaded", event => {
  //const user = JSON.parse("<%-userID%>");
  //console.log("user", user);
  // DBHelper.checkConnectivity();
  // DBHelper.fetchOfflineBaance();
  fetchBalance();
});

const fetchBalance = () => {
  const userID = getCredentials();
  const span = "monthly";
  return PaciolifyAPIHelper.fetchBalance(userID, span)
    .then(res => buildBalanceSheet(res.data, span))
    .then(balanceSheet => {
      plotBalance(balanceSheet, span);
    });
};

const getCredentials = () => getCookieValue("user");

// Elaborate input events and produce a balance sheet
const buildBalanceSheet = (arrayOfEvents, periodRange) =>
  arrayOfEvents.map(period => {
    const { from, to, data } = period;

    let incomes = [];
    let liabilities = [];
    let totalIncomes = 0;
    let totalLiabilities = 0;

    // Normalize each value by summing up and push into income/liability
    Object.entries(data).forEach(entry => {
      const [key, value] = entry;
      const amount = parseInt(Number(getSubTotal(value)).toFixed(2), 10);
      //Case Incomes
      if (key == "micro-v2-income") {
        incomes.push({ label: key, tot: amount, data: value });
        totalIncomes = totalIncomes + amount;
      } else {
        liabilities.push({ label: key, tot: amount, data: value });
        totalLiabilities = totalLiabilities + amount;
      }
    });

    return { incomes, liabilities, totalLiabilities, totalIncomes, from, to };
  });

// Plot balance chart and table
const plotBalance = (data, span) => {
  const labels = mapLabels(data);
  const totLiabilities = mapTotalLiabilityToPlot(data);
  const totIncomes = mapTotalIncomeToPlot(data);
  const liabilities = mapLiabilitiesToPlot(data);
  const incomes = mapIncomesToPlot(data);

  // Prepare data to plot
  const chartDatasets = [totIncomes, totLiabilities].concat(liabilities);
  const tableDataset1 = {
    incomes: [totIncomes].concat(incomes),
    liabilities: [totLiabilities].concat(liabilities)
  };

  //  Plot data
  plotChart(labels, chartDatasets);
  plotTable(labels, tableDataset1);
};

// map labels
const mapLabels = data =>
  data.map(period => {
    const date = new Date(period.to);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${day}/${month}/${year}`;
  });

// Preprocessing liabilities for plotting
const mapLiabilitiesToPlot = data => {
  let liabilitiesContainer = {};
  let colorIndex = 0;

  // Build the container of liabilities
  data.forEach(period =>
    period.liabilities.forEach(liability => {
      if (!liabilitiesContainer[liability.label]) {
        liabilitiesContainer[liability.label] = {
          label: liability.label.split("micro-v2-")[1],
          type: "line",
          borderColor: COLORS[colorIndex],
          backgroundColor: COLORS[colorIndex],
          data: [],
          details: [],
          fill: false
        };
        colorIndex++;
      }
    })
  );

  //Fill the container of liabilities with data;
  Object.keys(liabilitiesContainer).forEach(key => {
    data.forEach(period => {
      let detailToPush = {};
      let amountToPush = 0;

      period.liabilities.forEach(liability => {
        if (key === liability.label) {
          detailToPush = liability.data;
          amountToPush = liability.tot;
        }
      });

      liabilitiesContainer[key].data.push(Math.abs(amountToPush));
      liabilitiesContainer[key].details.push(detailToPush);
    });
  });
  return $.map(liabilitiesContainer, (value, index) => value);
};

// Preprocessing revenues for plotting
const mapIncomesToPlot = data => {
  let incomesContainer = {};
  let colorIndex = 0;

  // Build the container of incomes
  data.forEach(period =>
    period.incomes.forEach(liability => {
      if (!incomesContainer[liability.label]) {
        incomesContainer[liability.label] = {
          label: liability.label.split("micro-v2-")[1],
          type: "line",
          borderColor: COLORS[colorIndex],
          backgroundColor: COLORS[colorIndex],
          data: [],
          details: [],
          fill: false
        };
        colorIndex++;
      }
    })
  );

  //Fill the container of incomes with data;
  Object.keys(incomesContainer).forEach(key => {
    data.forEach(period => {
      let detailToPush = {};
      let amountToPush = 0;

      period.incomes.forEach(liability => {
        if (key === liability.label) {
          detailToPush = liability.data;
          amountToPush = liability.tot;
        }
      });

      incomesContainer[key].data.push(Math.abs(amountToPush));
      incomesContainer[key].details.push(detailToPush);
    });
  });
  return $.map(incomesContainer, (value, index) => value);
};

// process total incomes to plot
const mapTotalIncomeToPlot = _data => {
  const data = _data.map(period => period.totalIncomes);
  return {
    label: "Incomes",
    type: "line",
    backgroundColor: "rgba(60, 186, 159, 0.2)",
    borderColor: "rgba(60, 186, 159, 0.2)",
    data
  };
};

// process total liability to plot
const mapTotalLiabilityToPlot = _data => {
  const data = _data.map(period => Math.abs(period.totalLiabilities));
  return {
    label: "Liabilities",
    type: "line",
    backgroundColor: "rgba(196, 88, 80, 0.2)",
    borderColor: "rgba(196, 88, 80, 0.2)",
    data
  };
};

// Plot balance chart
const plotChart = (labels, datasets) => {
  const target = document.getElementById("balance-chart");
  const options = {
    maintainAspectRatio: false,
    responsive: true,
    title: {
      display: true,
      text: `Balance sheet`
    },
    legend: {
      display: true,
      position: "bottom",
      fullWidth: true
    },
    scales: {
      yAxes: [
        {
          stacked: false,
          ticks: {
            beginAtZero: true
          }
        }
      ],
      xAxes: [
        {
          stacked: false,
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  };

  new Chart(target, {
    type: "line",
    data: {
      labels,
      datasets
    },
    options
  });
};

// Plot balance sheet
const plotTable = (labels, datasets) => {
  const { incomes, liabilities } = datasets;

  const totCurrRevenue = incomes[0].data[incomes[0].data.length - 1];
  const totPastRevenue = incomes[0].data[incomes[0].data.length - 2];
  const totCurrLiability = liabilities[0].data[incomes[0].data.length - 1];
  const totPastLiability = liabilities[0].data[incomes[0].data.length - 2];

  const detailIncomes = incomes.slice(1);
  const detailLiability = liabilities.slice(1);

  // Filling pivots
  document.getElementById(`current_revenue_tot`).innerHTML = formatValue(
    totCurrRevenue
  );
  document.getElementById(`previous_revenue_tot`).innerHTML = formatValue(
    totPastRevenue
  );
  document.getElementById(`current_liability_tot`).innerHTML = formatValue(
    totCurrLiability
  );
  document.getElementById(`previous_liability_tot`).innerHTML = formatValue(
    totPastLiability
  );

  //Filling liabilities
  const liabilitiesContainer = document.getElementById("liability_items");
  detailLiability.forEach(item => {
    const { label, data, details } = item;

    const lastIndex = data.length - 1;

    printRow(
      [
        label,
        plotEntry(data[lastIndex - 1], details[lastIndex - 1]),
        plotEntry(data[lastIndex], details[lastIndex])
      ],
      liabilitiesContainer
    );
  });

  //Filling revenues
  const revenueContainer = document.getElementById("revenue_items");
  detailIncomes.forEach(item => {
    const { label, data, details } = item;
    const lastIndex = data.length - 1;
    printRow(
      [
        label,
        plotEntry(data[lastIndex - 1], details[lastIndex - 1]),
        plotEntry(data[lastIndex], details[lastIndex])
      ],
      revenueContainer
    );
  });
};

// Labels row for detailed entries
const plotEntry = (value, labels) => {
  let labelsStr = "";
  if (labels) {
    Object.keys(labels).forEach(key => {
      labelsStr = labelsStr.concat(
        `<span class="badge badge-secondary">${key}: ${formatValue(
          labels[key]
        )}</span>\n`
      );
    });

    return `
    <div>
      <p>${formatAbsValue(value)}</p>
      ${labelsStr}

    </div>
    `;
  } else {
    return `
    <div>
      ${formatValue(value)}
    </div>
    `;
  }
};

/*
 * UTILS
 */

// Returns the sum of the entries of a gien object
const getSubTotal = obj =>
  Object.entries(obj).reduce((tot, pair) => {
    const [key, value] = pair;
    return tot + value;
  }, 0);

// Returns value formated with currency
const formatValue = value => `${value === undefined ? 0 : value}${currency}`;

// Retrun the absolut value formatted as currency
const formatAbsValue = value =>
  `${value === undefined ? 0 : Math.abs(value)}${currency}`;

// create a <td> and append it to a given node of the DOM
const printRow = (arr, node) => {
  const row = document.createElement("tr");
  arr.forEach(elm => {
    const col = document.createElement("td");
    col.innerHTML = elm;
    row.append(col);
  });
  node.append(row);
};

// create a <th> elemetnt and append it to a given node of the DOM
const printHeaderRow = (arr, node) => {
  const row = document.createElement("tr");
  arr.forEach(elm => {
    const col = document.createElement("th");
    col.setAttribute("scope", "col");
    col.innerHTML = elm;
    row.append(col);
  });
  node.append(row);
};

function getCookieValue(a) {
  var b = document.cookie.match("(^|[^;]+)\\s*" + a + "\\s*=\\s*([^;]+)");
  return b ? b.pop() : "";
}
