const plotPolarChart = data => {
  new Chart(document.getElementById("doughnut-chart"), {
    type: "doughnut",
    data: {
      labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
      datasets: [
        {
          label: "Population (millions)",
          backgroundColor: [
            "#3e95cd",
            "#8e5ea2",
            "#3cba9f",
            "#e8c3b9",
            "#c45850"
          ],
          data: [2478, 5267, 734, 784, 433]
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: "Predicted world population (millions) in 2050"
      }
    }
  });
};

const plotLineChart = data => {
  new Chart(document.getElementById("line-chart"), {
    type: "line",
    data: {
      labels: [1500, 1600, 1700, 1750, 1800, 1850, 1900, 1950, 1999, 2050],
      datasets: [
        {
          data: [86, 114, 106, 106, 107, 111, 133, 221, 783, 2478],
          label: "Africa",
          borderColor: "#3e95cd",
          fill: false
        },
        {
          data: [282, 350, 411, 502, 635, 809, 947, 1402, 3700, 5267],
          label: "Asia",
          borderColor: "#8e5ea2",
          fill: false
        },
        {
          data: [168, 170, 178, 190, 203, 276, 408, 547, 675, 734],
          label: "Europe",
          borderColor: "#3cba9f",
          fill: false
        },
        {
          data: [40, 20, 10, 16, 24, 38, 74, 167, 508, 784],
          label: "Latin America",
          borderColor: "#e8c3b9",
          fill: false
        },
        {
          data: [6, 3, 2, 2, 7, 26, 82, 172, 312, 433],
          label: "North America",
          borderColor: "#c45850",
          fill: false
        }
      ]
    },
    options: {
      title: {
        display: false,
        text: "World population per region (in millions)"
      }
    }
  });
};

// const plotMixedChart = data => {
//   const target = document.getElementById("mixed-chart");
//   const colors = ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"];
//
//   const labels = data.labels || ["June", "July", "August", "September"];
//
//   new Chart(target, {
//     type: "bar",
//     data: {
//       labels,
//       datasets: [
//         {
//           label: "Liabilities",
//           type: "bar",
//           backgroundColor: "rgba(196, 88, 80, 0.2)",
//           borderColor: "rgba(196, 88, 80, 0.2)",
//           data: [-408, -547, -675, -734]
//         },
//         {
//           label: "Incomes",
//           type: "bar",
//           backgroundColor: "rgba(60, 186, 159, 0.2)",
//           borderColor: "rgba(60, 186, 159, 0.2)",
//           data: [133, 221, 783, 2478]
//         },
//         {
//           label: "Groceries",
//           type: "line",
//           borderColor: colors[0],
//           backgroundColor: colors[0],
//           data: [-408, -547, -675, -734],
//           fill: false
//         },
//         {
//           label: "Fun",
//           type: "line",
//           borderColor: colors[1],
//           backgroundColor: colors[1],
//           data: [-133, -221, -783, -2478],
//           fill: false
//         }
//       ]
//     },
//     options: {
//       title: {
//         display: false,
//         text: "WoW controlling"
//       },
//       legend: { display: true, position: "right" }
//     }
//   });
// };
