const API = "https://my-money-backend-dq7n.onrender.com";

let userId = localStorage.getItem("userId");

// Signup
async function signup(){
  const res = await fetch(API+"/signup",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({
      email:signupEmail.value,
      password:signupPassword.value
    })
  });

  const data = await res.json();
  alert(data.message);
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
    loadData();
  } else {
    alert("Wrong email/password");
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

  loadData();
}

// Load Data
async function loadData(){
  if(!userId) return;

  // balance
  const b = await fetch(API+"/balance",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({userId})
  });

  const bdata = await b.json();
  balance.innerText = bdata.balance;

  // transactions
  const res = await fetch(API+"/get",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({userId})
  });

  const data = await res.json();

  list.innerHTML = "";
  data.forEach(t=>{
    list.innerHTML += `<li>₹${t.amount} - ${t.category}</li>`;
  });
}

// Auto load
window.onload = loadData;
