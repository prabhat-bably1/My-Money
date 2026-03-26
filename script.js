const API = "https://my-money-backend-dq7n.onrender.com/api";

let token = localStorage.getItem("token") || "";

// REGISTER
async function register() {
  const res = await fetch(API + "/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value
    })
  });

  const data = await res.json();
  alert("Registered ✅");
}

// LOGIN
async function login() {
  const res = await fetch(API + "/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: document.getElementById("email").value,
      password: document.getElementById("password").value
    })
  });

  const data = await res.json();

  token = data.token;
  localStorage.setItem("token", token);

  alert("Login Success 🔥");
}

// ADD TRANSACTION
async function addTransaction() {
  const res = await fetch(API + "/transactions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    },
    body: JSON.stringify({
      type: document.getElementById("type").value,
      amount: document.getElementById("amount").value,
      category: document.getElementById("category").value,
      note: document.getElementById("note").value
    })
  });

  const data = await res.json();
  alert("Added ✅");
  getTransactions();
}

// GET DATA
async function getTransactions() {
  const res = await fetch(API + "/transactions", {
    headers: {
      "Authorization": token
    }
  });

  const data = await res.json();

  let list = document.getElementById("list");
  list.innerHTML = "";

  data.forEach(item => {
    list.innerHTML += `
      <li>${item.type} - ₹${item.amount} (${item.category})</li>
    `;
  });
}
