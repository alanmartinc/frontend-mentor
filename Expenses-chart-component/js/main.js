const spendingData = [
  {
    day: "mon",
    amount: 17.45,
  },
  {
    day: "tue",
    amount: 34.91,
  },
  {
    day: "wed",
    amount: 52.36,
  },
  {
    day: "thu",
    amount: 31.07,
  },
  {
    day: "fri",
    amount: 23.39,
  },
  {
    day: "sat",
    amount: 43.28,
  },
  {
    day: "sun",
    amount: 25.48,
  },
];

function createBarChart(data) {
  let barChart = document.getElementById("chart");
  spendingData.forEach((day) => {
    let weekdayDiv = document.createElement("div");
    weekdayDiv.className = "weekday";
    weekdayDiv.id = day.day;
    barChart.appendChild(weekdayDiv);

    let amountDiv = document.createElement("div");
    amountDiv.className = "amount";
    amountDiv.innerHTML += `$${day.amount}`;
    weekdayDiv.appendChild(amountDiv);

    let barDiv = document.createElement("div");
    barDiv.className = "bar";
    barDiv.style.height += day.amount * 4 + "px";
    weekdayDiv.appendChild(barDiv);

    let labelDiv = document.createElement("div");
    labelDiv.className = "label";
    labelDiv.innerHTML += day.day;
    weekdayDiv.appendChild(labelDiv);
  });
}

createBarChart(spendingData);

console.log(weekdayDiv);
