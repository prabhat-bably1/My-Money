const API = "https://my-money-backend-dq7n.onrender.com";

let chart;

// ADD DATA
async function addData(){
  const amount = document.getElementById("amount").value;
  const type = document.getElementById("type").value;
  const category = document.getElementById("category").value;
  const note = document.getElementById("note").value;
  const date = document.getElementById("date").value;

  if(!amount || !date){
    alert("Enter amount & date");
    return;
  }

  await fetch(API + "/add", {
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      authorization: localStorage.getItem("token")
    },
    body: JSON.stringify({amount,type,category,note,date})
  });

  loadData();
}

// LOAD DATA
async function loadData(){
  const res = await fetch(API + "/data", {
    headers:{authorization: localStorage.getItem("token")}
  });

  const data = await res.json();

  let income = 0;
  let expense = 0;

  const list = document.getElementById("list");
  list.innerHTML = "";

  data.forEach(d=>{
    if(d.type === "income"){
      income += Number(d.amount);
    } else {
      expense += Number(d.amount);
    }

    list.innerHTML += `
      <li>
        ${d.type} - ₹${d.amount}<br>
        ${d.category || "-"}<br>
        ${d.note || "-"}<br>
        ${d.date}
      </li>`;
  });

  document.getElementById("income").innerText = "₹" + income;
  document.getElementById("expense").innerText = "₹" + expense;

  // TAX
  const result = calculateTax(income);
  document.getElementById("tax").innerText =
    "₹" + (result.tax + result.caCharge);

  updateChart(income, expense);
}

// TAX FUNCTION
function calculateTax(income){
  let tax = 0;

  if(income <= 250000) tax = 0;
  else if(income <= 500000) tax = (income-250000)*0.05;
  else if(income <= 1000000) tax = 12500 + (income-500000)*0.2;
  else tax = 112500 + (income-1000000)*0.3;

  let caCharge = tax * 0.05;

  return {tax, caCharge};
}

// TAX DETAILS CLICK
function showTaxDetails(){
  const box = document.getElementById("taxDetails");

  if(box.style.display === "none"){
    box.style.display = "block";
  } else {
    box.style.display = "none";
    return;
  }

  const income = Number(
    document.getElementById("income").innerText.replace("₹","")
  );

  const result = calculateTax(income);

  document.getElementById("taxIncome").innerText =
    "Income: ₹" + income;

  document.getElementById("taxAmount").innerText =
    "Tax: ₹" + result.tax;

  document.getElementById("caCharge").innerText =
    "CA Charge: ₹" + result.caCharge;

  let advice = "";

  if(income <= 250000){
    advice = "No tax 👍";
  } else if(income <= 500000){
    advice = "Invest in LIC / ELSS";
  } else if(income <= 1000000){
    advice = "Use 80C, NPS, Insurance";
  } else {
    advice = "High tax → Use CA planning";
  }

  document.getElementById("taxAdvice").innerText = advice;
}

// CHART
function updateChart(income, expense){
  const ctx = document.getElementById("chart");

  if(chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Income", "Expense"],
      datasets: [{
        data: [income, expense]
      }]
    }
  });
}

// AUTO LOAD
if(location.pathname.includes("dashboard")){
  loadData();
}
