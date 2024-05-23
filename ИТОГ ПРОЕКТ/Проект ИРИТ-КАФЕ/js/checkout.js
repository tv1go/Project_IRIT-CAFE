document.addEventListener('DOMContentLoaded', function() {
    const orderForm = document.getElementById('order-form');

    orderForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Предотвращаем отправку формы по умолчанию

        if (!validateForm()) {
            return; // Если валидация не пройдена, выходим из обработчика события
        }

        confirmOrder(); // Если валидация пройдена, оформляем заказ
    });
});

function validateForm() {
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;

    if (!name || !phone || !address) {
        alert('Пожалуйста, заполните все обязательные поля.');
        return false; // Отменяем отправку формы
    }

    // Убираем лишние символы из номера телефона (кроме цифр)
    const cleanedPhone = phone.replace(/[^\d]/g, '');

    // Проверяем, что номер телефона состоит из 11 цифр и начинается с "7" или "8"
    const phoneRegex = /^(7|8)\d{10}$/;
    if (!phoneRegex.test(cleanedPhone)) {
        alert('Пожалуйста, введите корректный номер телефона в формате +7(999)123-45-67 или 8(999)123-45-67.');
        return false; // Отменяем отправку формы
    }

    return true; // Все данные прошли валидацию
}

function confirmOrder() {
    // Показываем уведомление об успешном заказе
    alert('Спасибо за заказ! Доставка займет примерно 30-45 минут.');

    // Очищаем форму
    document.getElementById('order-form').reset();
}
