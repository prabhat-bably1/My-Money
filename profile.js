const API = "https://my-money-backend-dq7n.onrender.com";
const TOKEN = localStorage.getItem("token");

// LOAD PROFILE
async function loadProfile() {
  try {
    const res = await fetch(API + "/user/profile", {
      headers: { authorization: TOKEN }
    });

    const data = await res.json();

    document.getElementById("name").innerText = data.name;
    document.getElementById("email").innerText = data.email;

  } catch (err) {
    console.log(err);
  }
}

// OPEN EDIT BOX
function editProfile() {
  let newName = prompt("Enter new name:");
  let newEmail = prompt("Enter new email:");

  if (!newName || !newEmail) {
    alert("All fields required!");
    return;
  }

  fetch(API + "/user/profile", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: TOKEN
    },
    body: JSON.stringify({
      name: newName,
      email: newEmail
    })
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      alert("Profile Updated ✅");
      loadProfile(); // reload data
    } else {
      alert("Update failed ❌");
    }
  })
  .catch(err => {
    console.log(err);
    alert("Server error ❌");
  });
}

// SAVE PROFILE
async function saveProfile() {
  let name = document.getElementById("newName").value;
  let email = document.getElementById("newEmail").value;

  if (!name || !email) {
    alert("Fill all fields");
    return;
  }

  try {
    const res = await fetch(API + "/user/update-profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: TOKEN
      },
      body: JSON.stringify({ name, email })
    });

    const data = await res.json();

    alert("Profile Updated ✅");

    document.getElementById("name").innerText = name;
    document.getElementById("email").innerText = email;

    document.getElementById("editBox").style.display = "none";

  } catch (err) {
    console.log(err);
  }
}

// CHANGE PASSWORD
async function changePassword() {
  let pass = prompt("Enter new password:");

  if (!pass) return;

  await fetch(API + "/user/change-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: TOKEN
    },
    body: JSON.stringify({ password: pass })
  });

  alert("Password Changed ✅");
}

// LOGOUT
function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}

// ABOUT
function aboutApp() {
  alert("My Money App 💰\nTrack income, expense & tax easily.");
}

// SUPPORT
function contactSupport() {
  window.location.href = "mailto:support@mymoney.com";
}

// START
loadProfile();
