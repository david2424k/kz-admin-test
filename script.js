// ✅ Проверка, на какой странице сейчас пользователь
const isAdminPage = window.location.pathname.includes("admin.html");

// ✅ Логика для кнопки "Админа" (если нужно расширение)
function goToAdmin() {
    window.location.href = "admin.html";
}

// ✅ Простая защита: пароль при входе в admin.html
if (isAdminPage) {
    const password = "1234"; // можешь поменять

    const userInput = prompt("Введите пароль для входа в админ-панель:");

    if (userInput !== password) {
        alert("Неверный пароль! Возврат на главную страницу.");
        window.location.href = "index.html";
    } else {
        console.log("Доступ в админ-панель разрешён");
    }
}

// ✅ Заглушка — сюда в будущем вставятся данные пользователей
function loadUserData() {
    console.log("Здесь будет загрузка данных пользователей...");
}

// Если это admin.html — вызываем функцию
if (isAdminPage) {
    loadUserData();
}
