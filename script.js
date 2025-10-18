// === Обработка формы на index.html ===
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();

    if (name && phone && message) {
      const entry = { name, phone, message, time: new Date().toLocaleString() };
      const data = JSON.parse(localStorage.getItem('requests') || '[]');
      data.push(entry);
      localStorage.setItem('requests', JSON.stringify(data));

      alert('✅ Заявка отправлена!');
      form.reset();
    }
  });
}

// === Панель администратора на admin.html ===
const loginBtn = document.getElementById('loginBtn');
const adminPanel = document.getElementById('adminPanel');
const loginPanel = document.getElementById('loginPanel');
const tableBody = document.querySelector('#dataTable tbody');
const clearBtn = document.getElementById('clearBtn');

if (loginBtn) {
  loginBtn.addEventListener('click', () => {
    const pass = document.getElementById('adminPassword').value;
    if (pass === 'admin') {
      loginPanel.classList.add('hidden');
      adminPanel.classList.remove('hidden');
      loadRequests();
    } else {
      alert('Неверный пароль');
    }
  });
}

function loadRequests() {
  const data = JSON.parse(localStorage.getItem('requests') || '[]');
  tableBody.innerHTML = '';
  data.forEach(r => {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${r.name}</td><td>${r.phone}</td><td>${r.message}</td>`;
    tableBody.appendChild(row);
  });
}

if (clearBtn) {
  clearBtn.addEventListener('click', () => {
    if (confirm('Очистить все заявки?')) {
      localStorage.removeItem('requests');
      loadRequests();
    }
  });
}
