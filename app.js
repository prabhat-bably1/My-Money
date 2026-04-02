const API = "https://my-money-backend-dq7n.onrender.com";

// ADD DATA
async function addData(){
  const amount = document.getElementById("amount").value;
  const type = document.getElementById("type").value;
  const category = document.getElementById("category").value;
  const note = document.getElementById("note").value;
  const date = document.getElementById("date").value;

  await fetch(API+"/add",{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      authorization:localStorage.getItem("token")
    },
    body:JSON.stringify({amount,type,category,note,date})
  });

  loadData();
}

// LOAD DATA
async function loadData(){
  const res = await fetch(API+"/data",{
    headers:{authorization:localStorage.getItem("token")}
  });

  const data = await res.json();

  let income = 0;
  let expense = 0;

  list.innerHTML = "";

  data.forEach(d=>{
    if(d.type === "income"){
      income += d.amount;
    } else {
      expense += d.amount;
    }

    list.innerHTML += `
    <li style="margin-bottom:10px;">
      <b>${d.type.toUpperCase()}</b> ₹${d.amount}<br>
      📂 ${d.category || "-"}<br>
      📝 ${d.note || "-"}<br>
      📅 ${d.date}
    </li>`;
  });

  // TAX LOGIC
  const taxable = income - expense;
  const tax = taxable > 0 ? taxable * 0.1 : 0;
  const caCharge = tax * 0.05;

  document.getElementById("income").innerText = "₹" + income;
  document.getElementById("expense").innerText = "₹" + expense;
  document.getElementById("tax").innerText = "₹" + (tax + caCharge);
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
