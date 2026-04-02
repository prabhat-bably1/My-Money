const API = "https://my-money-backend-dq7n.onrender.com";

// LOAD
async function loadProfile(){
  const res = await fetch(API+"/profile",{
    headers:{authorization:localStorage.getItem("token")}
  });

  const data = await res.json();

  document.getElementById("name").value = data.name;
  document.getElementById("email").value = data.email;
}

// SAVE
async function saveProfile(){
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  await fetch(API+"/profile",{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      authorization:localStorage.getItem("token")
    },
    body:JSON.stringify({name,email})
  });

  alert("Saved ✅");
}

loadProfile();
