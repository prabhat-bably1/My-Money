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

  // CHART
const ctx = document.getElementById("chart");

new Chart(ctx, {
  type: "pie",
  data: {
    labels: ["Income", "Expense"],
    datasets: [{
      data: [income, expense],
      backgroundColor: ["green", "red"]
    }]
  }
});
  // TAX LOGIC
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
else{
  tax = 112500 + (income - 1000000) * 0.3;
}

const caCharge = tax * 0.05;

document.getElementById("tax").innerText =
  "₹" + (tax + caCharge);

// LOGOUT
function logout(){
  localStorage.removeItem("token");
  location.href = "index.html";
}

// AUTO LOAD
if(location.pathname.includes("dashboard")){
  loadData();
}
function downloadPDF(){
  let content = "Money Report\n\n";

  document.querySelectorAll("#list li").forEach(li=>{
    content += li.innerText + "\n\n";
  });

  const blob = new Blob([content], {type: "text/plain"});
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "report.txt";
  a.click();
}
