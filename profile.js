let user = JSON.parse(localStorage.getItem("user"));

name.innerText = user.name;
email.innerText = user.email;

newName.value = user.name;
newEmail.value = user.email;

function updateProfile() {
  user.name = newName.value;
  user.email = newEmail.value;

  localStorage.setItem("user", JSON.stringify(user));
  alert("Updated");
}

function logout() {
  localStorage.removeItem("login");
  location.href = "index.html";
}
