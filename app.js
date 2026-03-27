const API = "http://my-money-backend-dq7n.onrender.com";

let userId = null;

// Signup
async function signup() {
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  const res = await fetch(API + "/signup", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();
  alert(data.message);
}

// Login
async function login() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const res = await fetch(API + "/login", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (data.user) {
    userId = data.user._id;
    alert("Login Success");
    loadBalance();
  } else {
    alert(data.message);
  }
}

// Add Transaction
async function addTransaction() {
  const type = document.getElementById("type").value;
  const amount = document.getElementById("amount").value;
  const category = document.getElementById("category").value;

  const res = await fetch(API + "/add", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ userId, type, amount, category })
  });

  const data = await res.json();
  alert(data.message);
  loadBalance();
}

// Load Balance
async function loadBalance() {
  const res = await fetch(API + "/balance/" + userId);
  const data = await res.json();

  document.getElementById("balance").innerText = data.balance;
}
