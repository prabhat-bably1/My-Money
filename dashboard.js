const API = "https://my-money-backend-dq7n.onrender.com";

const incomeEl = document.getElementById("income");
const expenseEl = document.getElementById("expense");
const taxEl = document.getElementById("tax");
const list = document.getElementById("list");

let allData = [];
let chart;

async function addData(){
  await fetch(API+"/add",{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      authorization:localStorage.getItem("token")
    },
    body:JSON.stringify({
      amount:amount.value,
      type:type.value,
      category:category.value,
      note:note.value,
      date:date.value
    })
  });

  loadData();
}

async function loadData(){
  const res = await fetch(API+"/data",{
    headers:{authorization:localStorage.getItem("token")}
  });

  allData = await res.json();

  let income=0, expense=0;

  allData.forEach(d=>{
    d.type==="income"?income+=d.amount:expense+=d.amount;
  });

  incomeEl.innerText="₹"+income;
  expenseEl.innerText="₹"+expense;
  document.getElementById("balance").innerText="₹"+(income-expense);

  showData(allData);
  drawChart(income,expense);
}

function showData(arr){
  list.innerHTML="";
  arr.forEach(d=>{
    list.innerHTML+=`<li>${d.type} ₹${d.amount}</li>`;
  });
}

function filterData(type){
  showData(allData.filter(d=>d.type===type));
}

function showTaxDetails(){
  document.getElementById("taxDetails").style.display="block";
}

let chart;

function drawChart(income, expense){
    const ctx = document.getElementById("chart");

    if(chart) chart.destroy();

    chart = new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: ["Income", "Expense"],
            datasets: [{
                data: [income, expense],
                backgroundColor: ["#00ff88", "#ff4444"]
            }]
        },
        options: {
            plugins: {
                legend: {
                    labels: {
                        color: "#fff"
                    }
                }
            }
        }
    });
}

function logout(){
  localStorage.clear();
  location.href="index.html";
}

loadData();

function calculateTax(income){
  let tax = 0;

  if(income <= 250000) tax = 0;
  else if(income <= 500000) tax = (income - 250000) * 0.05;
  else if(income <= 1000000) tax = 12500 + (income - 500000) * 0.2;
  else tax = 112500 + (income - 1000000) * 0.3;

  let caCharge = tax > 0 ? tax * 0.05 : 0;

  return {
    tax: Math.round(tax),
    caCharge: Math.round(caCharge)
  };
}

function showTaxDetails(){

  const box = document.getElementById("taxDetails");

  if(box.style.display === "block"){
    box.style.display = "none";
    return;
  } else {
    box.style.display = "block";
  }

  let income = 0;
  let expense = 0;

  allData.forEach(d => {
    if(d.type === "income") income += Number(d.amount);
    else expense += Number(d.amount);
  });

  let balance = income - expense;
  if(balance < 0) balance = 0;

  const result = calculateTax(balance);

  document.getElementById("taxIncome").innerText = "₹" + income;
  document.getElementById("taxExpense").innerText = "₹" + expense;
  document.getElementById("taxBalance").innerText = "₹" + balance;

  if(balance <= 250000){
    document.getElementById("taxAmount").innerText = "No Tax";
    document.getElementById("taxAdvice").innerText = "Safe 👍";
    return;
  }

  document.getElementById("taxAmount").innerText = "Tax: ₹" + result.tax;
  document.getElementById("caCharge").innerText = "CA: ₹" + result.caCharge;
}
