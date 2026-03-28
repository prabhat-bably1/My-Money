const API = "https://my-money-backend-dq7n.onrender.com";

let chart;

// SIGNUP
document.getElementById("signupBtn").onclick = async () => {
  const email = signupEmail.value;
  const password = signupPassword.value;

  const res = await fetch(API + "/signup", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({email, password})
  });

  const data = await res.json();
  alert(data.message);
};

// LOGIN
document.getElementById("loginBtn").onclick = async () => {
  const email = loginEmail.value;
  const password = loginPassword.value;

  const res = await fetch(API + "/login", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({email, password})
  });

  const data = await res.json();

  if(data.success){
    localStorage.setItem("userId", data.userId);
    alert("Login Success ✅");
    loadBalance();
    loadChart();
  } else {
    alert("User not found ❌");
  }
};

// ADD
document.getElementById("addBtn").onclick = async () => {
  const userId = localStorage.getItem("userId");

  if(!userId){
    alert("Login first ❌");
    return;
  }

  const res = await fetch(API + "/add", {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify({
      userId,
      type: type.value,
      amount: amount.value,
      category: category.value
    })
  });

  const data = await res.json();
  alert(data.message);

  loadBalance();
  loadChart();
};

// BALANCE
async function loadBalance(){
  const userId = localStorage.getItem("userId");
  if(!userId) return;

  const res = await fetch(API + "/balance/" + userId);
  const data = await res.json();

  balance.innerText = data.balance || 0;
}

// CHART (dummy analytics)
async function loadChart(){
  const ctx = document.getElementById('chart');

  if(chart) chart.destroy();

  chart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Income', 'Expense'],
      datasets: [{
        data: [60, 40],
      }]
    }
  });
}

window.onload = () => {
  loadBalance();
  loadChart();
};
