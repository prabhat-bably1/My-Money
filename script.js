let transactions = JSON.parse(localStorage.getItem("data")) || [];

function updateUI() {
  let list = document.getElementById("list");
  let balance = document.getElementById("balance");

  list.innerHTML = "";

  let total = 0;

  transactions.forEach((t, index) => {
    let li = document.createElement("li");

    li.innerHTML = `
      ${t.desc} - ₹${t.amount} (${t.type})
      <button onclick="deleteItem(${index})">❌</button>
    `;

    list.appendChild(li);

    if (t.type === "income") {
      total += t.amount;
    } else {
      total -= t.amount;
    }
  });

  balance.innerText = total;
}

function addTransaction() {
  let desc = document.getElementById("desc").value;
  let amount = Number(document.getElementById("amount").value);
  let type = document.getElementById("type").value;
  let source = document.getElementById("source").value;

  if (desc === "" || amount === 0) {
    alert("Enter valid data");
    return;
  }

  transactions.push({ desc, amount, type, source });

  localStorage.setItem("data", JSON.stringify(transactions));

  updateUI();

  document.getElementById("desc").value = "";
  document.getElementById("amount").value = "";
}

function deleteItem(index) {
  transactions.splice(index, 1);
  localStorage.setItem("data", JSON.stringify(transactions));
  updateUI();
}

updateUI();
function login() {
  let user = document.getElementById("username").value;
  let pass = document.getElementById("password").value;

  if (user === "admin" && pass === "1234") {
    localStorage.setItem("loggedIn", true);
    showApp();
  } else {
    alert("Wrong login");
  }
}

function showApp() {
  document.getElementById("loginBox").style.display = "none";
  document.getElementById("app").style.display = "block";
}

if (localStorage.getItem("loggedIn")) {
  showApp();
}
