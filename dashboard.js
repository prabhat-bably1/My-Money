let data = JSON.parse(localStorage.getItem("data")) || []

function addData() {
  const amount = amount.value
  const type = type.value
  const date = date.value

  data.push({ amount, type, date })

  localStorage.setItem("data", JSON.stringify(data))
  showData(data)
}

function showData(arr) {
  list.innerHTML = ""
  arr.forEach(d => {
    list.innerHTML += `<li>${d.type} - ₹${d.amount} - ${d.date}</li>`
  })
}

function filterData() {
  const d = filterDate.value
  const filtered = data.filter(x => x.date === d)
  showData(filtered)
}

function downloadPDF() {
  alert("PDF feature coming next step")
}

function goProfile() {
  window.location.href = "profile.html"
}

window.onload = () => showData(data)
