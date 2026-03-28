const API = "https://my-money-backend-dq7n.onrender.com";

let token = localStorage.getItem("token");

// Signup
async function signup(){
  const res = await fetch(API+"/signup",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({
      email:sEmail.value,
      password:sPass.value
    })
  });

  const data = await res.json();
  alert(data.message || data.error);
}

// Login
async function login(){
  const res = await fetch(API+"/login",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({
      email:lEmail.value,
      password:lPass.value
    })
  });

  const data = await res.json();

  if(data.token){
    token = data.token;
    localStorage.setItem("token", token);

    alert("Login success");

    // 🔥 NEW
    document.getElementById("auth").style.display = "none";
    document.getElementById("app").style.display = "block";

    loadData();
  } else {
    alert(data.error);
  }
}

// Add
async function add(){
  if(!token){
    alert("Login first");
    return;
  }

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

  loadData();
}

// Load Data
async function loadData(){
  if(!token) return;

  // balance
  const b = await fetch(API+"/balance",{
    headers:{authorization:token}
  });
  const bdata = await b.json();
  balance.innerText = bdata.balance;

  // list
  const res = await fetch(API+"/transactions",{
    headers:{authorization:token}
  });

  const data = await res.json();

  list.innerHTML = "";
  data.forEach(t=>{
    list.innerHTML += `<li>₹${t.amount} - ${t.category}</li>`;
  });
}

// Auto load
window.onload = loadData;
window.onload = () => {
  if(token){
    document.getElementById("auth").style.display = "none";
    document.getElementById("app").style.display = "block";
    loadData();
  }
}
