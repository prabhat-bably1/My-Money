const API = "https://my-money-backend-dq7n.onrender.com";
let token = localStorage.getItem("token");

// ✅ LOAD PROFILE
async function loadProfile() {
  const res = await fetch(API + "/profile", {
    headers: { authorization: token }
  });

  const data = await res.json();

  // 👇 display me dikhane ke liye
  document.getElementById("name").innerText = data.name || "No Name";
  document.getElementById("email").innerText = data.email || "";

  // 👇 edit box me fill karne ke liye
  document.getElementById("newName").value = data.name || "";
  document.getElementById("newEmail").value = data.email || "";
}

// ✅ UPDATE PROFILE
async function updateProfile() {
  const name = document.getElementById("newName").value;
  const email = document.getElementById("newEmail").value;

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

      // 👇 turant screen pe update
      document.getElementById("name").innerText = name;
      document.getElementById("email").innerText = email;

      // 👇 edit box band
      document.getElementById("editBox").style.display = "none";
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
function openEdit() {
  document.getElementById("editBox").style.display = "block";
}
