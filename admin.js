function makeUserAdmin() {
  let user = JSON.parse(localStorage.getItem("user"))
  user.role = "admin"
  localStorage.setItem("user", JSON.stringify(user))

  alert("Now you are admin")
}
