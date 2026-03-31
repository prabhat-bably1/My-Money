const API = "https://my-money-backend-dq7n.onrender.com";
const TOKEN = localStorage.getItem("token");

// LOAD USER DATA
async function loadProfile() {
  const res = await fetch(API + "/user/profile", {
    headers: { authorization: TOKEN }
  });

  const data = await res.json();

  document.getElementById("name").innerText = data.name;
  document.getElementById("email").innerText = data.email;
}

// EDIT PROFILE
function editProfile() {
  alert("Edit Profile coming soon");
}

// CHANGE PASSWORD
function changePassword() {
  const pass = prompt("Enter new password:");
  
  if (!pass) return;

  fetch(API + "/user/change-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: TOKEN
    },
    body: JSON.stringify({ password: pass })
  })
  .then(() => alert("Password Changed"));
}

// LOGOUT
function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}

// ABOUT APP
function aboutApp() {
  alert("My Money App\nTrack your income & expenses easily 💰");
}

// CONTACT SUPPORT
function contactSupport() {
  window.location.href = "mailto:support@mymoney.com";
}

// LOAD ON START
loadProfile();
