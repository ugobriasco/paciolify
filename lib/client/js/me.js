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
  return PaciolifyAPIHelper.fetchBalance(userID, "monthly")
    .then(res => buildBalanceSheet(res.data))
    .then(res => {
      plotBalanceChart();
    });
};

const buildBalanceSheet = balance => {
  console.log(res);
  return pivots;
};

const plotBalanceChart = () => {
  const target = document.getElementById("mixed-chart");
  const colors = ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"];

  const labels = ["June", "July", "August", "September"];

  new Chart(target, {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          label: "Liabilities",
          type: "bar",
          backgroundColor: "rgba(196, 88, 80, 0.2)",
          borderColor: "rgba(196, 88, 80, 0.2)",
          data: [-408, -547, -675, -734]
        },
        {
          label: "Incomes",
          type: "bar",
          backgroundColor: "rgba(60, 186, 159, 0.2)",
          borderColor: "rgba(60, 186, 159, 0.2)",
          data: [133, 221, 783, 2478]
        },
        {
          label: "Groceries",
          type: "line",
          borderColor: colors[0],
          backgroundColor: colors[0],
          data: [-408, -547, -675, -734],
          fill: false
        },
        {
          label: "Fun",
          type: "line",
          borderColor: colors[1],
          backgroundColor: colors[1],
          data: [-133, -221, -783, -2478],
          fill: false
        }
      ]
    },
    options: {
      title: {
        display: false,
        text: "WoW controlling"
      },
      legend: { display: true, position: "right" }
    }
  });
};
