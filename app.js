const API = "https://my-money-backend-dq7n.onrender.com";

let userId = localStorage.getItem("userId");

// Signup
async function signup(){
  await fetch(API+"/signup",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({
      email:signupEmail.value,
      password:signupPassword.value
    })
  });

  alert("Signup done");
}

// Login
async function login(){
  const res = await fetch(API+"/login",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({
      email:loginEmail.value,
      password:loginPassword.value
    })
  });

  const data = await res.json();

  if(data.success){
    userId = data.userId;
    localStorage.setItem("userId", userId);

    alert("Login success");

    loadAll();
  } else {
    alert("User not found");
  }
}

// Add
async function add(){
  if(!userId){
    alert("Login first");
    return;
  }

  await fetch(API+"/add",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({
      userId,
      type:type.value,
      amount:Number(amount.value),
      category:category.value
    })
  });

  loadAll();
}

// Load all
async function loadAll(){
  if(!userId) return;

  // Balance
  const b = await fetch(API+"/balance",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({userId})
  });

  const bdata = await b.json();
  balance.innerText = bdata.balance;

  // Transactions
  const res = await fetch(API+"/get",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({userId})
  });

  const data = await res.json();

  list.innerHTML = "";

  let income=0, expense=0;

  data.forEach(t=>{
    if(t.type==="income") income+=t.amount;
    else expense+=t.amount;

    list.innerHTML += `
      <li>
        ₹${t.amount} (${t.category})
        <button onclick="del('${t._id}')">❌</button>
      </li>
    `;
  });

  drawChart(income,expense);
}

// Delete
async function del(id){
  await fetch(API+"/delete",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({id})
  });

  loadAll();
}

// Chart
function drawChart(income,expense){
  new Chart(document.getElementById("chart"),{
    type:"pie",
    data:{
      labels:["Income","Expense"],
      datasets:[{data:[income,expense]}]
    }
  });
}

// Auto load
window.onload=loadAll;
