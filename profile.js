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
  const name = document.getElementById("newName").value.trim()
  const email = document.getElementById("newEmail").value.trim()

  if (!name || !email) {
    alert("Fill all fields ❌")
    return
  }

  let user = JSON.parse(localStorage.getItem("user"))

  if (!user) {
    alert("User not found, login again ❌")
    return
  }

  user.name = name
  user.email = email

  localStorage.setItem("user", JSON.stringify(user))

  alert("Profile Updated ✅")

  // instant update UI
  document.getElementById("name").innerText = name
  document.getElementById("email").innerText = email
}

// UPLOAD PROFILE PIC
function uploadPic(event) {
  const file = event.target.files[0]

  if (!file) return

  const reader = new FileReader()

  reader.onload = function (e) {
    let user = JSON.parse(localStorage.getItem("user")) || {}

    user.pic = e.target.result

    localStorage.setItem("user", JSON.stringify(user))

    document.getElementById("profilePic").src = e.target.result
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
