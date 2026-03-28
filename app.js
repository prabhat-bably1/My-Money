const API = "https://my-money-backend-dq7n.onrender.com";

function showTab(tab){
  dashboard.style.display = tab==="dashboard"?"block":"none";
  history.style.display = tab==="history"?"block":"none";
  loadTransactions();
}

// LOGIN
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

  if(data.token){
    localStorage.setItem("token", data.token);
    loadBalance();
  }
}

// ADD
async function add(){
  const token = localStorage.getItem("token");

  await fetch(API+"/add",{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      "authorization":token
    },
    body:JSON.stringify({
      type:type.value,
      amount:Number(amount.value),
      category:category.value
    })
  });

  loadBalance();
  loadTransactions();
}

// BALANCE
async function loadBalance(){
  const token = localStorage.getItem("token");

  const res = await fetch(API+"/balance",{
    headers:{authorization:token}
  });

  const data = await res.json();
  balance.innerText = data.balance;
}

// TRANSACTIONS
async function loadTransactions(){
  const token = localStorage.getItem("token");

  const res = await fetch(API+"/transactions",{
    headers:{authorization:token}
  });

  const data = await res.json();

  list.innerHTML = "";

  data.forEach(t=>{
    list.innerHTML += `
      <li>
        ₹${t.amount} - ${t.category}
        <button onclick="del('${t._id}')">❌</button>
      </li>
    `;
  });
}

// DELETE
async function del(id){
  await fetch(API+"/delete/"+id,{method:"DELETE"});
  loadTransactions();
}
