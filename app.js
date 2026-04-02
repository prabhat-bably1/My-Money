const API = "https://my-money-backend-dq7n.onrender.com";

// SIGNUP
async function signup(){
  const name = sName.value;
  const email = sEmail.value;
  const password = sPass.value;

  const res = await fetch(API+"/signup",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({name,email,password})
  });

  const data = await res.json();
  alert(data.msg || data.error);
}

// LOGIN
async function login(){
  const email = lEmail.value;
  const password = lPass.value;

  const res = await fetch(API+"/login",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({email,password})
  });

  const data = await res.json();

  if(data.token){
    localStorage.setItem("token",data.token);
    location.href="dashboard.html";
  }else{
    alert(data.error);
  }
}

// ADD DATA
async function addData(){
  const amount = amount.value;
  const type = type.value;
  const date = date.value;

  await fetch(API+"/add",{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      authorization:localStorage.getItem("token")
    },
    body:JSON.stringify({amount,type,date})
  });

  loadData();
}

// LOAD DATA
async function loadData(){
  const res = await fetch(API+"/data",{
    headers:{authorization:localStorage.getItem("token")}
  });

  const data = await res.json();

  list.innerHTML="";
  data.forEach(d=>{
    list.innerHTML+=`<li>${d.type} ₹${d.amount} (${d.date})</li>`;
  });
}

// LOGOUT
function logout(){
  localStorage.removeItem("token");
  location.href="index.html";
}

if(location.pathname.includes("dashboard")){
  loadData();
}
