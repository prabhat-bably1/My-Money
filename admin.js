function makeAdmin() {
  let user = JSON.parse(localStorage.getItem("user"));
  user.role = "admin";
  localStorage.setItem("user", JSON.stringify(user));
  alert("You are now admin");
}
