// === Обработка формы (index.html) ===
const form = document.getElementById("contactForm");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (name && email && message) {
      const data = JSON.parse(localStorage.getItem("requests") || "[]");
      data.push({ name, email, message, time: new Date().toLocaleString() });
      localStorage.setItem("requests", JSON.stringify(data));
      alert("✅ Заявка отправлена!");
      form.reset();
    }
  });
}

// === Панель администратора (admin.html) ===
const loginBtn = document.getElementById("loginBtn");
const adminPanel = document.getElementById("adminPanel");
const loginPanel = document.getElementById("loginPanel");
const tableBody = document.getElementById("dataTable");
const clearBtn = document.getElementById("clearBtn");

if (loginBtn) {
  loginBtn.addEventListener("click", () => {
    const pass = document.getElementById("adminPassword").value;
    if (pass === "admin") {
      loginPanel.classList.add("hidden");
      adminPanel.classList.remove("hidden");
      loadData();
    } else {
      alert("Неверный пароль");
    }
  });
}

function loadData() {
  const data = JSON.parse(localStorage.getItem("requests") || "[]");
  tableBody.innerHTML = "";
  data.forEach((r) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="border p-2">${r.name}</td>
      <td class="border p-2">${r.email}</td>
      <td class="border p-2">${r.message}</td>
    `;
    tableBody.appendChild(row);
  });
}

if (clearBtn) {
  clearBtn.addEventListener("click", () => {
    if (confirm("Очистить все заявки?")) {
      localStorage.removeItem("requests");
      loadData();
    }
  });
}
