// DEMO DATA (baad me API se replace karenge)
let transactions = [
  { amount: 500000, type: "income" },
  { amount: 200000, type: "income" },
  { amount: 50000, type: "expense", isDeductible: true },
  { amount: 20000, type: "expense", isDeductible: false }
];

// CALCULATE TOTALS
let totalIncome = 0;
let deductibleExpense = 0;

transactions.forEach(t => {
  if (t.type === "income") {
    totalIncome += t.amount;
  }
  if (t.type === "expense" && t.isDeductible) {
    deductibleExpense += t.amount;
  }
});

// TAXABLE INCOME
let taxableIncome = totalIncome - deductibleExpense;

// TAX CALCULATION (simple India slab)
function calculateTax(income) {
  if (income <= 250000) return 0;
  if (income <= 500000) return (income - 250000) * 0.05;
  if (income <= 1000000) return 12500 + (income - 500000) * 0.1;
  return 62500 + (income - 1000000) * 0.2;
}

let tax = calculateTax(taxableIncome);

// UPDATE UI
document.getElementById("income").innerText = totalIncome;
document.getElementById("expense").innerText = deductibleExpense;
document.getElementById("taxable").innerText = taxableIncome;
document.getElementById("tax").innerText = tax;

// TAX SAVING TIPS
function getTips(income) {
  let tips = [];

  if (income > 500000) {
    tips.push("80C me invest karo (PPF, ELSS)");
    tips.push("Health insurance lo (80D)");
  }

  if (income > 1000000) {
    tips.push("Business expense claim karo");
  }

  return tips;
}

let tips = getTips(taxableIncome);
let tipsList = document.getElementById("tips");

tips.forEach(tip => {
  let li = document.createElement("li");
  li.innerText = tip;
  tipsList.appendChild(li);
});
function isTaxable(source, amount) {
  // simple logic (baad me upgrade kar sakte ho)

  if (source === "gift" && amount < 50000) return false;
  if (source === "salary") return true;
  if (source === "freelance") return true;

  return false;
}
