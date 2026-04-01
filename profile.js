const API = "https://my-money-backend-dq7n.onrender.com";
let token = localStorage.getItem("token");

// ✅ LOAD PROFILE
async function loadProfile() {
  try {
    const res = await fetch(API + "/profile", {
      headers: { authorization: token }
    });

    const data = await res.json();

    document.getElementById("name").value = data.name || "";
    document.getElementById("email").value = data.email || "";

  } catch {
    alert("Error loading profile ❌");
  }
}

// ✅ UPDATE PROFILE
async function updateProfile() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  try {
    const res = await fetch(API + "/update-profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: token
      },
      body: JSON.stringify({ name, email })
    });

    const data = await res.json();

    if (data.message) {
      alert("Profile Updated ✅");
    } else {
      alert(data.error || "Error ❌");
    }

  } catch {
    alert("Server Error ❌");
  }
}

// ✅ LOGOUT
function logout() {
  localStorage.removeItem("token");
  location.href = "index.html";
}

// ✅ AUTO LOAD
loadProfile();
