const API = "https://my-money-backend-dq7n.onrender.com";

// SIGNUP
async function signup(){
  const name = document.getElementById("sName").value;
  const email = document.getElementById("sEmail").value;
  const password = document.getElementById("sPass").value;

  const res = await fetch(API + "/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, email, password })
  });

  const data = await res.json();
  alert(data.msg || data.error);
}

// LOGIN
async function login(){
  const email = document.getElementById("lEmail").value;
  const password = document.getElementById("lPass").value;

  const res = await fetch(API + "/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if(data.token){
    localStorage.setItem("token", data.token);
    location.href = "dashboard.html";
  } else {
    alert(data.error);
  }
}
