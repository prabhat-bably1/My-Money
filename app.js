const API = "https://my-money-backend-dq7n.onrender.com";

async function signup(){
  await fetch(API+"/signup",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({
      email:email.value,
      password:password.value
    })
  });
  alert("Signup done");
}

async function login(){
  const res = await fetch(API+"/login",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({
      email:email.value,
      password:password.value
    })
  });

  const data = await res.json();
  localStorage.setItem("token", data.token);
  location.href="dashboard.html";
}
