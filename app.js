const API = "https://my-money-backend-dq7n.onrender.com";

let token = localStorage.getItem("token");
let chart;

// LOGIN
async function login(){
  const res = await fetch(API+"/login",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({
      email:lEmail.value,
      password:lPass.value
    })
  });

  const data = await res.json();

  if(data.token){
  localStorage.setItem("token", data.token);
  showApp();   // 👈 add this
  loadData();
  }

    auth.style.display="none";
    app.style.display="block";

    loadData();
  } else {
    alert("Login failed");
  }
}
function showApp(){
  document.getElementById("auth").style.display = "none";
  document.getElementById("app").style.display = "block";
}
// LOGOUT
function logout(){
  localStorage.removeItem("token");
  location.reload();
}

// ADD
async function add(){
  await fetch(API+"/add",{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      "authorization":token
    },
    body:JSON.stringify({
      type:type.value,
      amount:Number(amount.value),
      category:category.value,
      note:note.value
    })
  });

  loadData();
}

// LOAD DATA
async function loadData(){

  const res = await fetch(API+"/transactions",{
    headers:{authorization:token}
  });

  const data = await res.json();

  let income=0, expense=0;
  list.innerHTML="";

  data.forEach(t=>{
    if(t.type==="income") income+=t.amount;
    else expense+=t.amount;

    list.innerHTML += `
      <li>
        ₹${t.amount} - ${t.category}
        <br>${t.note || ""}
      </li>
    `;
  });

  balance.innerText = income - expense;
  incomeEl = document.getElementById("income");
  expenseEl = document.getElementById("expense");

  incomeEl.innerText = income;
  expenseEl.innerText = expense;

  drawChart(income, expense);
}

// CHART
function drawChart(income, expense){

  if(chart) chart.destroy();

  chart = new Chart(document.getElementById("chart"), {
    type: 'doughnut',
    data: {
      labels: ["Income", "Expense"],
      datasets: [{
        data: [income, expense]
      }]
    }
  });
}

// AUTO LOGIN
window.onload = ()=>{
  if(token){
    auth.style.display="none";
    app.style.display="block";
    loadData();
  }
};
async function downloadPDF(){
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const res = await fetch(API+"/transactions",{
    headers:{authorization:token}
  });

  const data = await res.json();

  doc.setFontSize(18);
  doc.text("MoneyFlow Report", 10, 10);

  let y = 20;
  let total = 0;

  data.forEach(t=>{
    total += t.amount;

    doc.setFontSize(12);
    doc.text(
      `${t.type.toUpperCase()} - ₹${t.amount} | ${t.category}`,
      10,
      y
    );

    y += 8;
  });

  doc.setFontSize(14);
  doc.text("Total: ₹" + total, 10, y+10);

  doc.save("report.pdf");
}
let chart;

function drawChart(data){
  let income = 0;
  let expense = 0;

  data.forEach(t=>{
    if(t.type === "income") income += t.amount;
    else expense += t.amount;
  });

  if(chart) chart.destroy();

  chart = new Chart(document.getElementById("chart"), {
    type: "doughnut",
    data: {
      labels: ["Income","Expense"],
      datasets: [{
        data: [income, expense],
        backgroundColor: ["#22c55e","#ef4444"]
      }]
    }
  });
}
