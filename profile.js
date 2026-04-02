// LOAD
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

  if (user.pic) {
    document.getElementById("profilePic").src = user.pic
  }
}

// EDIT OPEN
function openEdit() {
  document.getElementById("editBox").style.display = "block"
}

// UPDATE
function updateProfile() {
  const name = document.getElementById("newName").value.trim()
  const email = document.getElementById("newEmail").value.trim()

  if (!name || !email) {
    alert("Fill all fields")
    return
  }

  let user = JSON.parse(localStorage.getItem("user"))

  user.name = name
  user.email = email

  localStorage.setItem("user", JSON.stringify(user))

  alert("Updated ✅")

  document.getElementById("name").innerText = name
  document.getElementById("email").innerText = email
}

// IMAGE
function uploadPic(event) {
  const file = event.target.files[0]
  if (!file) return

  const reader = new FileReader()

  reader.onload = function (e) {
    let user = JSON.parse(localStorage.getItem("user"))
    user.pic = e.target.result

    localStorage.setItem("user", JSON.stringify(user))
    document.getElementById("profilePic").src = e.target.result
  }

  reader.readAsDataURL(file)
}

// LOGOUT
function logout() {
  localStorage.removeItem("user")
  window.location.href = "index.html"
}
