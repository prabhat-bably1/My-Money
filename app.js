let data = JSON.parse(localStorage.getItem("data")) || [];

function addData() {
  const amount = Number(amountEl.value);
  const type = typeEl.value;
  const category = categoryEl.value;
  const note = noteEl.value;
  const date = dateEl.value;

  if (!amount || !date) return alert("Fill all fields");

  data.push({ amount, type, category, note, date });
  localStorage.setItem("data", JSON.stringify(data));

  updateUI();
}

const amountEl = document.getElementById("amount");
const typeEl = document.getElementById("type");
const categoryEl = document.getElementById("category");
const noteEl = document.getElementById("note");
const dateEl = document.getElementById("date");

function updateUI() {
  showData(data);
  updateSummary();
  drawChart();
}

function showData(arr) {
  list.innerHTML = "";
  arr.forEach(d => {
    list.innerHTML += `<li><b>${d.type}</b> ₹${d.amount}<br>${d.date}</li>`;
  });
}

function filterData(type) {
  showData(data.filter(d => d.type === type));
}

function updateSummary() {
  let income = 0, expense = 0;

  data.forEach(d => {
    d.type === "income" ? income += d.amount : expense += d.amount;
  });

  incomeEl.innerText = "₹" + income;
  expenseEl.innerText = "₹" + expense;

  const taxData = calculateTax(income);
  taxEl.innerText = "₹" + (taxData.tax + taxData.caCharge);
}

function calculateTax(income) {
  let tax = income * 0.1;
  let caCharge = tax * 0.05;
  return { tax, caCharge };
}

function showTaxDetails() {
  const income = Number(incomeEl.innerText.replace("₹",""));
  const t = calculateTax(income);

  taxIncome.innerText = "Income: ₹" + income;
  taxAmount.innerText = "Tax: ₹" + t.tax;
  caCharge.innerText = "CA Charge: ₹" + t.caCharge;

  taxAdvice.innerText = income > 500000
    ? "Use NPS / ELSS to save tax"
    : "Low tax 👍";

  taxDetails.style.display = "block";
}

function drawChart() {
  const inc = data.filter(d=>d.type==="income").length;
  const exp = data.filter(d=>d.type==="expense").length;

  new Chart(chart, {
    type: "doughnut",
    data: {
      labels: ["Income","Expense"],
      datasets: [{ data: [inc,exp] }]
    }
  });
}

function logout() {
  localStorage.clear();
  location.reload();
}

window.onload = updateUI;
