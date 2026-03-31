const API = "https://my-money-backend-dq7n.onrender.com";

let token = localStorage.getItem("token") || "";

// ================= AUTH UI =================
function showApp() {
  document.getElementById("auth").style.display = "none";
  document.getElementById("app").style.display = "block";
}

// ================= SIGNUP =================
async function signup() {
  const email = document.getElementById("sEmail").value;
  const password = document.getElementById("sPass").value;

  try {
    const res = await fetch(API + "/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (data.message) {
      alert("Signup Success ✅");
    } else {
      alert(data.error || "Signup Failed ❌");
    }
  } catch {
    alert("Server Error ❌");
  }
}

// ================= LOGIN =================
async function login() {
  const email = document.getElementById("lEmail").value;
  const password = document.getElementById("lPass").value;

  try {
    const res = await fetch(API + "/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (data.token) {
      token = data.token;
      localStorage.setItem("token", token);

      alert("Login Success ✅");

      showApp();
      loadData();
    } else {
      alert(data.error || "Login Failed ❌");
    }
  } catch {
    alert("Server Error ❌");
  }
}

// ================= LOGOUT =================
function logout() {
  localStorage.removeItem("token");
  location.reload();
}

// ================= LOAD DATA =================
async function loadData() {
  try {
    const res = await fetch(API + "/transactions", {
      headers: { authorization: token }
    });

    const data = await res.json();

    let total = 0;
    const list = document.getElementById("list");
    list.innerHTML = "";

    data.forEach(t => {
      if (t.type === "income") total += t.amount;
      else total -= t.amount;

      list.innerHTML += `
        <li style="animation: fadeIn 0.4s ease;">
          ₹${t.amount} - ${t.category}<br>
          <small>${t.note || ""}</small>
        </li>
      `;
    });

    document.getElementById("balance").innerText = "₹ " + total;
    document.getElementById("balance").style.transition = "0.3s";

    drawChart(data);

  } catch (err) {
    alert("Error loading data ❌");
  }
}

// ================= ADD =================
async function add() {
  const type = document.getElementById("type").value;
  const amount = Number(document.getElementById("amount").value);
  const category = document.getElementById("category").value;
  const note = document.getElementById("note").value;

  try {
    const res = await fetch(API + "/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: token
      },
      body: JSON.stringify({ type, amount, category, note })
    });

    const data = await res.json();

    if (data.message) {
      alert("Added ✅");
      loadData();
    } else {
      alert(data.error || "Error ❌");
    }
  } catch {
    alert("Server Error ❌");
  }
}

// ================= CHART =================
let chart;

function drawChart(data) {
  let income = 0;
  let expense = 0;

  data.forEach(t => {
    if (t.type === "income") income += t.amount;
    else expense += t.amount;
  });

  if (chart) chart.destroy();

  chart = new Chart(document.getElementById("chart"), {
    type: "doughnut",
    data: {
      labels: ["Income", "Expense"],
      datasets: [{
        data: [income, expense],
        backgroundColor: ["#22c55e", "#ef4444"]
      }]
    }
  });
}

// ================= PDF =================
async function downloadPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const res = await fetch(API + "/transactions", {
    headers: { authorization: token }
  });

  const data = await res.json();

  doc.setFontSize(18);
  doc.text("MoneyFlow Report", 10, 10);

  let y = 20;
  let total = 0;

  data.forEach(t => {
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
  doc.text("Total: ₹ " + total, 10, y + 10);

  doc.save("report.pdf");
}

// ================= PWA INSTALL =================
let deferredPrompt;

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  const btn = document.getElementById("installBtn");
  if (btn) btn.style.display = "block";
});

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("installBtn");

  if (btn) {
    btn.addEventListener("click", () => {
      if (deferredPrompt) deferredPrompt.prompt();
    });
  }
});

// ================= AUTO LOGIN =================
window.onload = function () {
  const saved = localStorage.getItem("token");

  if (saved) {
    token = saved;
    showApp();
    loadData();
  }
};
function openProfile() {
  window.location.href = "profile.html";
}
function openTax() {
  window.location.href = "tax.html";
}
