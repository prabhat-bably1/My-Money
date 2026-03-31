const API = "https://my-money-backend-dq7n.onrender.com";
const TOKEN = localStorage.getItem("token");

// ---------- TAX LOGIC ----------

// check taxable
function isTaxable(source, amount) {
  if (source === "gift" && amount < 50000) return false;
  if (source === "salary") return true;
  if (source === "freelance") return true;
  return false;
}

// calculate tax
function calculateTax(amount, taxable) {
  if (!taxable) return 0;

  if (amount <= 250000) return 0;
  if (amount <= 500000) return (amount - 250000) * 0.05;

  return (amount - 500000) * 0.1 + 12500;
}

// process income
function processIncome(income) {
  let taxable = isTaxable(income.source, income.amount);
  let tax = calculateTax(income.amount, taxable);

  return {
    ...income,
    taxable: taxable,
    tax: tax,
    caRequired: taxable && tax > 0
  };
}

// show UI
function showIncome(data) {
  let div = document.getElementById("incomeList");

  data.forEach(item => {
    let box = document.createElement("div");

    box.style.background = "rgba(255,255,255,0.1)";
    box.style.margin = "10px";
    box.style.padding = "10px";
    box.style.borderRadius = "10px";

    box.innerHTML = `
      <h3>Income: ₹${item.amount}</h3>
      <p>Source: ${item.source}</p>
      <p>Taxable: ${item.taxable ? "YES" : "NO"}</p>
      <p>Tax: ₹${item.tax}</p>
      <p>${item.caRequired ? "⚠️ CA charges may apply" : ""}</p>
    `;

    div.appendChild(box);
  });
}

// ---------- TEST DATA ----------

async function loadTransactions() {
  try {
    const res = await fetch(API + "/transactions", {
      headers: {
        authorization: TOKEN
      }
    });

    const data = await res.json();

    processData(data);
  } catch (err) {
    console.log(err);
  }
}
function processData(transactions) {
  let incomes = [];

  transactions.forEach(t => {
    if (t.type === "income") {
      incomes.push({
        amount: t.amount,
        source: t.category || "other"
      });
    }
  });

  let processed = incomes.map(processIncome);

  showIncome(processed);
}
loadTransactions();
