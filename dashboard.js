let data = JSON.parse(localStorage.getItem("data")) || [];

function addData() {
  const item = {
    amount: amount.value,
    type: type.value,
    date: date.value
  };

  data.push(item);
  localStorage.setItem("data", JSON.stringify(data));
  showData(data);
  drawChart();
}

function showData(arr) {
  list.innerHTML = "";
  arr.forEach(d => {
    list.innerHTML += `<li>${d.type} ₹${d.amount} (${d.date})</li>`;
  });
}

function filterData() {
  const f = filterDate.value;
  const filtered = data.filter(d => d.date === f);
  showData(filtered);
}

function logout() {
  localStorage.removeItem("login");
  location.href = "index.html";
}

function goProfile() {
  location.href = "profile.html";
}

// 📊 Chart
function drawChart() {
  const income = data.filter(d => d.type === "income").length;
  const expense = data.filter(d => d.type === "expense").length;

  new Chart(document.getElementById("chart"), {
    type: "pie",
    data: {
      labels: ["Income", "Expense"],
      datasets: [{
        data: [income, expense]
      }]
    }
  });
}

// 📄 PDF
function downloadPDF() {
  let text = "My Money Report\n\n";
  data.forEach(d => {
    text += `${d.type} ₹${d.amount} (${d.date})\n`;
  });

  const blob = new Blob([text], { type: "text/plain" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "report.txt";
  a.click();
}

window.onload = () => {
  showData(data);
  drawChart();
};
