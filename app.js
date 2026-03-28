const API = "https://my-money-backend-dq7n.onrender.com";

// SIGNUP
document.getElementById("signupBtn").onclick = async () => {
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  const res = await fetch(API + "/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();
  alert(data.message);
};

// LOGIN
document.getElementById("loginBtn").onclick = async () => {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const res = await fetch(API + "/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (data.success) {
    alert("Login Success ✅");
    localStorage.setItem("userId", data.userId);
    loadBalance();
  } else {
    alert("User not found ❌");
  }
};

// ADD TRANSACTION
document.getElementById("addBtn").onclick = async () => {
  const userId = localStorage.getItem("userId");

  if (!userId) {
    alert("Login first ❌");
    return;
  }

  const type = document.getElementById("type").value;
  const amount = document.getElementById("amount").value;
  const category = document.getElementById("category").value;

  const res = await fetch(API + "/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId,
      type,
      amount,
      category
    })
  });

  const data = await res.json();

  alert(data.message || "Added ✅");

  loadBalance(); // 🔥 MOST IMPORTANT
};
// LOAD BALANCE
async function loadBalance() {
  const userId = localStorage.getItem("userId");

  if (!userId) return;

  const res = await fetch(API + "/balance/" + userId);
  const data = await res.json();

  console.log("Balance API:", data);

  document.getElementById("balance").innerText = data.balance || 0;
}
window.onload = () => {
  loadBalance();
};
