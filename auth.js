function signup() {
  const user = {
    name: sName.value,
    email: sEmail.value,
    password: sPassword.value,
    role: "user",
    pic: ""
  };

  localStorage.setItem("user", JSON.stringify(user));
  alert("Signup Success");
}

function login() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) return alert("No account");

  if (user.email === lEmail.value && user.password === lPassword.value) {
    localStorage.setItem("login", "true");

    if (user.role === "admin") {
      location.href = "admin.html";
    } else {
      location.href = "dashboard.html";
    }
  } else {
    alert("Wrong details");
  }
}
