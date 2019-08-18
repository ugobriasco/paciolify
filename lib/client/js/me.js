let balance;

// Fetch data a soon as the page is loaded
document.addEventListener("DOMContentLoaded", event => {
  // DBHelper.checkConnectivity();
  // fetchNeighborhoods();
  // fetchCuisines();
  // fetchRestaurants();
  // DBHelper.fetchOfflineReviews();
  fetchBalance();
});

const fetchBalance = () => {
  const userID = "5d489f64cd6ba32db3517503";
  const span = "monthly";
  return PaciolifyAPIHelper.fetchBalance(userID, span)
    .then(res => buildBalanceSheet(res.data, span))
    .then(balanceSheet => {
      plotBalanceChart(balanceSheet, span);
    });
};

// Returns the sum of the entries of a vien boject
const getSubTotal = obj =>
  Object.entries(obj).reduce((tot, pair) => {
    const [key, value] = pair;
    return tot + value;
  }, 0);

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

const mapLiabilitiesToPlot = (data, colors) => {
  let liabilitiesContainer = {};
  let colorIndex = 0;

  // Build the container of liabilities
  data.forEach(period =>
    period.liabilities.forEach(liability => {
      if (!liabilitiesContainer[liability.label]) {
        liabilitiesContainer[liability.label] = {
          label: liability.label.split("micro-v2-")[1],
          type: "line",
          borderColor: colors[colorIndex],
          backgroundColor: colors[colorIndex],
          data: [],
          fill: false
        };
        colorIndex++;
      }
    })
  );

  //Fill the container of liabilities with data;
  data.forEach(period =>
    period.liabilities.forEach(liability => {
      const amount = liability.tot && liability.tot != 0 ? liability.tot : 0;
      liabilitiesContainer[liability.label].data.push(Math.abs(amount));
    })
  );

  return $.map(liabilitiesContainer, (value, index) => value);
};

const plotBalanceChart = (data, span) => {
  console.log(data, span);
  const target = document.getElementById("mixed-chart");
  const colors = [
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

  const labels = data.map(period => {
    const date = new Date(period.to);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${day}/${month}/${year}`;
  });

  const totLiabilities = {
    data: data.map(period => Math.abs(period.totalLiabilities))
  };

  const totIncomes = {
    data: data.map(period => period.totalIncomes)
  };

  const liabilities = mapLiabilitiesToPlot(data, colors);

  console.log(liabilities);

  const datasets = [
    {
      label: "Liabilities",
      type: "line",
      backgroundColor: "rgba(196, 88, 80, 0.2)",
      borderColor: "rgba(196, 88, 80, 0.2)",
      data: totLiabilities.data
    },
    {
      label: "Incomes",
      type: "line",
      backgroundColor: "rgba(60, 186, 159, 0.2)",
      borderColor: "rgba(60, 186, 159, 0.2)",
      data: totIncomes.data
    }
  ].concat(liabilities);

  const options = {
    title: {
      display: true,
      text: `Balance sheet, ${span}`
    },
    legend: { display: true, position: "right" },
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
