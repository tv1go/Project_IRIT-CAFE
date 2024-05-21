document.addEventListener('DOMContentLoaded', function() {
    // Находим все кнопки "Добавить в корзину"
    const addToCartButtons = document.querySelectorAll('.button-primary');
     // Находим кнопку "Корзина"
    const cartButton = document.getElementById('cart-button');
    // Находим модальное окно корзины
    const cartModal = document.getElementById('cart-modal');
    // Находим кнопки закрытия модального окна
    const closeModalButtons = document.querySelectorAll('.modal .close');
    // Находим контейнер для товаров в корзине
    const cartItems = document.getElementById('cart-items');
    // Находим элемент для отображения общей суммы
    const totalCartPrice = document.getElementById('total-price');
  
    // Функция для открытия модального окна корзины
    function openCartModal() {
      cartModal.classList.add('is-open');
    }
  
    // Функция для закрытия модального окна корзины
    function closeCartModal() {
      cartModal.classList.remove('is-open');
    }
  
    // Функция для добавления товара в корзину
    function addToCartHandler(event) {
      const button = event.target;
      const card = button.closest('.card');
      const title = card.querySelector('.card-title').textContent;
      const price = parseInt(card.querySelector('.card-price-bold').textContent, 10);
  
      const item = document.createElement('div');
      item.classList.add('food-row');
      item.innerHTML = `
          <span class="food-name">${title}</span>
          <strong class="food-price">${price} ₽</strong>
          <div class="food-counter">
              <button class="counter-button decrement">-</button>
              <span class="counter">1</span>
              <button class="counter-button increment">+</button>
          </div>
      `;
  
      cartItems.appendChild(item);
  
      updateTotalPrice();
    }
  
    // Функция для обновления общей суммы в корзине
    function updateTotalPrice() {
      const prices = Array.from(cartItems.querySelectorAll('.food-price'))
                        .map(price => parseInt(price.textContent, 10));
      const totalPrice = prices.reduce((acc, cur) => acc + cur, 0);
      totalCartPrice.textContent = `${totalPrice} ₽`;
    }
  
    // Обработчик клика по кнопке "Корзина"
    cartButton.addEventListener('click', openCartModal);
  
    // Обработчики закрытия модального окна корзины
    closeModalButtons.forEach(button => {
      button.addEventListener('click', closeCartModal);
    });
  
    // Обработчик добавления товара в корзину
    addToCartButtons.forEach(button => {
      button.addEventListener('click', addToCartHandler);
    });
  
    // Обработчики изменения количества товаров в корзине
    cartItems.addEventListener('click', function(event) {
      const target = event.target;
      const counter = target.parentElement.querySelector('.counter');
      const priceElement = target.closest('.food-row').querySelector('.food-price');
      const price = parseInt(priceElement.textContent, 10);
  
      if (target.classList.contains('increment')) {
        const count = parseInt(counter.textContent, 10);
        counter.textContent = count + 1;
      } else if (target.classList.contains('decrement')) {
        const count = parseInt(counter.textContent, 10);
        if (count > 1) {
          counter.textContent = count - 1;
        }
      }
  
      updateTotalPrice();
    });
  });

  document.addEventListener('DOMContentLoaded', function() {
    const checkoutButton = document.getElementById('checkout-button');
    // Добавляем обработчик события при клике на кнопку
    checkoutButton.addEventListener('click', function() {
        //Перенаправляем пользователя на страницу checkout.html
        window.location.href = 'checkout.html';
    });
});
