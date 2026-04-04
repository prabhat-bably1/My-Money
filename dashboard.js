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

  const tax = income*0.1;
  const ca = tax*0.05;

  taxEl.innerText="₹"+(tax+ca);

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

function drawChart(income,expense){
  if(chart) chart.destroy();

  chart = new Chart(chart,{
    type:"pie",
    data:{
      labels:["Income","Expense"],
      datasets:[{data:[income,expense]}]
    }
  });
}

function logout(){
  localStorage.clear();
  location.href="index.html";
}

loadData();
