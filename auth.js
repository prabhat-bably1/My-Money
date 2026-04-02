// SIGNUP
function signup() {
  const name = document.getElementById("sName").value.trim()
  const email = document.getElementById("sEmail").value.trim()
  const password = document.getElementById("sPassword").value.trim()

  if (!name || !email || !password) {
    alert("Fill all fields ❌")
    return
  }

  const user = { name, email, password, pic: "" }

  localStorage.setItem("user", JSON.stringify(user))

  alert("Signup Success ✅")
}

// LOGIN
function login() {
  const email = document.getElementById("lEmail").value.trim()
  const password = document.getElementById("lPassword").value.trim()

  const user = JSON.parse(localStorage.getItem("user"))

  if (!user) {
    alert("No account ❌")
    return
  }

  if (user.email === email && user.password === password) {
    alert("Login Success ✅")
    window.location.href = "profile.html"
  } else {
    alert("Wrong details ❌")
  }
}
