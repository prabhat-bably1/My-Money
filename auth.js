function signup() {
  const name = sName.value
  const email = sEmail.value
  const password = sPassword.value

  const user = { name, email, password, pic: "", role: "user" }

  localStorage.setItem("user", JSON.stringify(user))

  alert("Signup success")
}

function login() {
  const email = lEmail.value
  const password = lPassword.value

  const user = JSON.parse(localStorage.getItem("user"))

  if (user && user.email === email && user.password === password) {
    localStorage.setItem("loggedIn", "true")

    if (user.role === "admin") {
      window.location.href = "admin.html"
    } else {
      window.location.href = "dashboard.html"
    }
  } else {
    alert("Wrong login")
  }
}
