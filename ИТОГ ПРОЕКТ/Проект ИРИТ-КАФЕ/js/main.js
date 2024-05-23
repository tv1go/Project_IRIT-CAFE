document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.button-primary.add-to-cart');
    const cartButton = document.getElementById('cart-button');
    const cartModal = document.getElementById('cart-modal');
    const closeModalButtons = document.querySelectorAll('.modal .close');
    const cartItems = document.getElementById('cart-items');
    const totalCartPrice = document.getElementById('total-price');
  
    //Функция для сохранения корзины в LocalStorage
    function saveCart() {
        const cartData = [];
        const items = cartItems.querySelectorAll('.food-row');
        items.forEach(item => {
            const title = item.querySelector('.food-name').textContent;
            const price = parseInt(item.querySelector('.food-price').textContent, 10);
            const count = parseInt(item.querySelector('.counter').textContent, 10);
            cartData.push({ title, price, count });
        });
        localStorage.setItem('cart', JSON.stringify(cartData));
    }
  
    //Функция для загрузки корзины из LocalStorage
    function loadCart() {
        const cartData = JSON.parse(localStorage.getItem('cart'));
        if (cartData) {
            cartData.forEach(({ title, price, count }) => {
                const item = createCartItem(title, price, count);
                cartItems.appendChild(item);
            });
            updateTotalPrice();
        }
    }
  
    function openCartModal() {
        cartModal.classList.add('is-open');
    }
  
    function closeCartModal() {
        cartModal.classList.remove('is-open');
    }
  
    //Функция для создания элемента позиции в корзине
    function createCartItem(title, price, count) {
        const item = document.createElement('div');
        item.classList.add('food-row');
        item.innerHTML = `
            <span class="food-name">${title}</span>
            <strong class="food-price">${price} ₽</strong>
            <div class="food-counter">
                <button class="counter-button decrement">-</button>
                <span class="counter">${count}</span>
                <button class="counter-button increment">+</button>
                <button class="counter-button remove"><img src="img/musorka.png" alt="Delete" class="delete-icon"></button>
            </div>
        `;
        return item;
    }
  
    //Функция для добавления товара в корзину
    function addToCartHandler(event) {
        const button = event.target;
        const card = button.closest('.card');
        const title = card.querySelector('.card-title').textContent;
        const price = parseInt(card.querySelector('.card-price-bold').textContent, 10);
  
        const existingItem = Array.from(cartItems.children).find(item => 
            item.querySelector('.food-name').textContent === title
        );
  
        if (existingItem) {
            const counter = existingItem.querySelector('.counter');
            counter.textContent = parseInt(counter.textContent, 10) + 1;
        } else {
            const item = createCartItem(title, price, 1);
            cartItems.appendChild(item);
        }
  
        updateTotalPrice();
        saveCart();
    }
  
    //Функция для обновления общей суммы в корзине
    function updateTotalPrice() {
        const prices = Array.from(cartItems.querySelectorAll('.food-row')).map(item => {
            const price = parseInt(item.querySelector('.food-price').textContent, 10);
            const count = parseInt(item.querySelector('.counter').textContent, 10);
            return price * count;
        });
        const totalPrice = prices.reduce((acc, cur) => acc + cur, 0);
        totalCartPrice.textContent = `${totalPrice} ₽`;
    }
  
    //Обработчик клика по кнопке "Корзина"
    cartButton.addEventListener('click', openCartModal);
  
    //Обработчики закрытия модального окна корзины
    closeModalButtons.forEach(button => {
        button.addEventListener('click', closeCartModal);
    });
  
    //Обработчик добавления товара в корзину
    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCartHandler);
    });
  
    //Обработчики изменения количества товаров в корзине и удаления товаров
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
        } else if (target.classList.contains('remove') || target.closest('.remove')) {
            target.closest('.food-row').remove();
        }
  
        updateTotalPrice();
        saveCart();
    });
  
    //Загрузка корзины при загрузке страницы
    loadCart();
  });
  