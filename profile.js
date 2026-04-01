// LOAD PROFILE
window.onload = function () {
  const user = JSON.parse(localStorage.getItem("user"))

  if (!user) {
    alert("Login first")
    window.location.href = "index.html"
    return
  }

  document.getElementById("name").innerText = user.name
  document.getElementById("email").innerText = user.email

  document.getElementById("newName").value = user.name
  document.getElementById("newEmail").value = user.email

  // load profile pic
  if (user.pic) {
    document.getElementById("profilePic").src = user.pic
  }
}

// OPEN EDIT
function openEdit() {
  document.getElementById("editBox").style.display = "block"
}

// UPDATE PROFILE
function updateProfile() {
  const name = document.getElementById("newName").value
  const email = document.getElementById("newEmail").value

  let user = JSON.parse(localStorage.getItem("user"))

  user.name = name
  user.email = email

  localStorage.setItem("user", JSON.stringify(user))

  alert("Profile Updated ✅")
  location.reload()
}

// UPLOAD PROFILE PIC
function uploadPic(event) {
  const file = event.target.files[0]
  const reader = new FileReader()

  reader.onload = function () {
    let user = JSON.parse(localStorage.getItem("user"))
    user.pic = reader.result

    localStorage.setItem("user", JSON.stringify(user))

    document.getElementById("profilePic").src = reader.result
  }

  reader.readAsDataURL(file)
}

// CHANGE PASSWORD
function changePassword() {
  const oldPass = document.getElementById("oldPass").value
  const newPass = document.getElementById("newPass").value

  let user = JSON.parse(localStorage.getItem("user"))

  if (user.password !== oldPass) {
    alert("Wrong old password ❌")
    return
  }

  user.password = newPass
  localStorage.setItem("user", JSON.stringify(user))

  alert("Password changed ✅")
}

// LOGOUT
function logout() {
  localStorage.removeItem("user")
  window.location.href = "index.html"
}
