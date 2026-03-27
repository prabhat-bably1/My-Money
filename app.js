const API = "http://my-money-backend-dq7n.onrender.com";

let userId = null;

// Signup
function signup() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  fetch(API + "/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  })
  .then(res => res.json())
  .then(data => alert(data.message))
  .catch(err => alert("Signup Error ❌"));
}

// Login
function login() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  fetch(API + "/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      alert("Login Success ✅");
      localStorage.setItem("userId", data.userId);
    } else {
      alert(data.message);
    }
  })
  .catch(err => alert("Login Error ❌"));
}

// Add Transaction
function addTransaction() {
  let type = document.getElementById("type").value;
  let amount = document.getElementById("amount").value;
  let category = document.getElementById("category").value;

  fetch(API + "/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      userId: localStorage.getItem("userId"),
      type: type,
      amount: amount,
      category: category
    })
  })
  .then(res => res.json())
  .then(data => alert(data.message))
  .catch(err => alert("Add Error ❌"));
}

// Load Balance
async function loadBalance() {
  const res = await fetch(API + "/balance/" + userId);
  const data = await res.json();

  document.getElementById("balance").innerText = data.balance;
}
