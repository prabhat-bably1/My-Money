const API = "https://my-money-backend-dq7n.onrender.com";

// ADD DATA
async function addData(){
  const amount = document.getElementById("amount").value;
  const type = document.getElementById("type").value;
  const category = document.getElementById("category").value;
  const note = document.getElementById("note").value;
  const date = document.getElementById("date").value;

  if(!amount || !date){
    alert("Fill amount & date");
    return;
  }

  await fetch(API + "/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: localStorage.getItem("token")
    },
    body: JSON.stringify({ amount, type, category, note, date })
  });

  loadData();
}

// LOAD DATA
async function loadData(){
  const res = await fetch(API + "/data", {
    headers:{
      authorization: localStorage.getItem("token")
    }
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
        <b>${d.type}</b> ₹${d.amount}<br>
        ${d.category || "-"}<br>
        ${d.note || "-"}<br>
        ${d.date}
      </li>
    `;
  });

  // UI UPDATE
  document.getElementById("income").innerText = "₹" + income;
  document.getElementById("expense").innerText = "₹" + expense;

  // TAX LOGIC (INDIA STYLE 🔥)
  let tax = 0;

  if(income <= 250000){
    tax = 0;
  } 
  else if(income <= 500000){
    tax = (income - 250000) * 0.05;
  } 
  else if(income <= 1000000){
    tax = 12500 + (income - 500000) * 0.2;
  } 
  else {
    tax = 112500 + (income - 1000000) * 0.3;
  }

  let caCharge = tax * 0.05;

  document.getElementById("tax").innerText =
    "₹" + Math.floor(tax + caCharge);
}

// LOGOUT
function logout(){
  localStorage.removeItem("token");
  location.href = "index.html";
}

// AUTO LOAD
if(location.pathname.includes("dashboard")){
  loadData();
}
