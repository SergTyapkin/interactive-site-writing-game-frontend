<style scoped lang="stylus">
ul
  padding-left 20px

img
  max-height 400px
  max-width 100%
</style>

<style scoped lang="stylus">
.root-html-template.styled
  // --------------------------

  .header {
    padding: 15px;
    background: #151515;
  }

  @keyframes float-from-left {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .header__logo {
    font-size: 40px;
    text-transform: uppercase;
    width: min-content;
    line-height: 1;
    margin: 0 auto 30px;
  }

  .header__logo img,
  .header__logo__top,
  .header__logo__bottom {
    opacity: 0;
    animation: float-from-left 0.6s ease-out forwards;
  }

  .header__logo img {
    height: 25px;
    margin-right: 5px;
    animation-delay: 0.4s;
  }

  .header__logo__bottom {
    display: flex;
    flex-direction: row-reverse;
    align-items: flex-start;
    justify-content: flex-end;
    font-size: 30px;
    animation-delay: 0.2s;
  }

  // --------------------------


  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 15px;
    padding: 0 60px;
  }

  .navbar__link {
    transition: opacity 0.2s ease;
    white-space: nowrap;
  }

  .navbar__link:hover {
    opacity: 0.7;
  }

  // --------------------------


  .main {
    background: white;
    color: black;
  }

  .main hr {
    margin: 20px 0 60px;
    border: 2px dashed;
  }

  // --------------------------


  .section {
    padding: 80px 40px;
  }

  .section:nth-of-type(2n) {
    background: #2c2c2c;
    color: white;
  }

  .section__header {
    text-align: center;
    padding-bottom: 30px;
    font-size: 30px;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  // --------------------------


  .gallery {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
  }

  .gallery__image {
    width: 30%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    border-radius: 10px;
    transform: rotateX(calc(var(--y) / var(--total-height) * -60deg + 30deg)) \
    rotateY(calc(var(--x) / var(--total-width) * 60deg - 30deg)) \
    translateX(calc(var(--x) / var(--total-width) * -60px + 30px)) \
    translateY(calc(var(--y) / var(--total-height) * -60px + 30px));
  }

  // --------------------------


  .section__list {
    padding: 20px 0 20px 20px;
  }

  .list__item {
    padding: 10px;
  }

  .item__header {
    //font-weight: bold;
    font-size: 20px;
    text-transform: uppercase;
  }

  .item__description {
    font-size: 14px;
    color: #555;
  }

  // --------------------------


  .section .details__summary {
    font-size: 24px;
    text-transform: uppercase;
    cursor: pointer;
  }

  .section .details__text {
    padding-left: 20px;
    padding-top: 10px;
    border-left: 1px solid #6c6c6c;
    margin-left: 10px;
  }

  .section .details__text > * {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px;
  }

  .section .details__text > *:nth-child(2n) {
    color: #78fa3e;
  }

  .section .details__text img {
    width: 25px;
    height: 25px;
  }

  // --------------------------


  .form-contacts {
    background: #2c2c2c;
    padding: 40px;
    border-radius: 20px;
    color: white;
    margin: 60px 0;
    opacity: 0;
    transform: translateX(-30px);
    transition: opacity 0.3s ease, transform 0.3s ease;
  }

  .form-contacts.visible {
    opacity: 1;
    transform: translateX(0);
  }

  .form-contacts__header {
    text-transform: uppercase;
    text-align: center;
    font-size: 25px;
  }

  .form-contacts__description {
    font-size: 14px;
    text-align: center;
    color: #bbb;
    margin-bottom: 15px;
  }

  .form-contacts__input-container {
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 15px;
  }

  .input-container__label {
    min-width: 200px;
  }

  .input-container__input,
  .form-contacts__input-submit {
    flex: 1;
    max-width: 400px;
    padding: 5px 10px;
    border-radius: 5px;
    background: #353535;
    border: none;
  }

  textarea.input-container__input {
    resize: vertical;
  }

  .form-contacts__input-radio-group .input-container__label {
    margin-right: 10px;
  }

  .form-contacts__input-submit {
    display: block;
    margin: 20px auto 0;
    padding: 10px 30px;
    font-weight: bold;
    cursor: pointer;
    font-size: 16px;
    transition: opacity 0.2s ease;
  }

  .form-contacts__input-submit:hover {
    opacity: 0.7;
  }

  // --------------------------


  .form-calculator {
    padding: 40px;
    color: white;
  }

  .form-calculator__header {
    text-transform: uppercase;
    font-weight: bold;
    text-align: center;
    font-size: 25px;
    margin-bottom: 20px;
  }

  .form-calculator__input-container {
    padding: 20px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 15px;
  }

  .input-calculator__label {
    min-width: 200px;
  }

  .input-calculator__input {
    flex: 1;
    max-width: 400px;
    padding: 15px 20px;
    border-radius: 5px;
    background: #353535;
    border: none;
  }

  // --------------------------


  .footer {
    padding: 40px 30px 20px;
    background: #151515;
    display: flex;
    justify-content: space-between;
  }

  .footer__header {
    text-transform: uppercase;
  }

  .footer__description {
    display: block;
    margin-bottom: 20px;
  }

  .footer__link {
    display: flex;
    align-items: center;
    gap: 10px;
    transition: opacity 0.2s ease;
  }

  .footer__link:hover {
    opacity: 0.7;
  }

  .footer__link.footer__link_telephone {
    font-size: 24px;
    text-decoration: underline;
  }

  .footer__link img {
    width: 30px;
    height: 30px;
  }
</style>

<template>
  <div class="root-html-template" :class="{styled}">
    <header class="header">
      <div class="header__logo" id="header__logo">
        <div class="header__logo__top">Mobile</div>
        <div class="header__logo__bottom">
          <span>store</span>
          <img src="../../res/res-site-2/logo.svg" alt="logo">
        </div>
      </div>

      <nav class="navbar">
        <a class="navbar__link" :href="`${onlyAnchorLinks ? '#' : '/'}products`">Продукция</a>
        <a class="navbar__link" :href="`${onlyAnchorLinks ? '#' : '/'}questions`">Вопросы</a>
        <a class="navbar__link" :href="`${onlyAnchorLinks ? '#' : '/'}about`">О нас</a>
        <a class="navbar__link" :href="`${onlyAnchorLinks ? '#' : '/'}contacts`">Контакты</a>
      </nav>
    </header>

    <main class="main" id="main">
      <section class="section" id="products">
        <header class="section__header">Наша продукция</header>
        <div class="gallery" id="gallery">
          <img class="gallery__image" src="../../res/res-site-2/phone1.jpg" alt="phone">
          <img class="gallery__image" src="../../res/res-site-2/phone2.webp" alt="phone">
          <img class="gallery__image" src="../../res/res-site-2/phone3.webp" alt="phone">
        </div>
      </section>

      <hr>

      <section class="section" id="questions">
        <header class="section__header">Кто мы?</header>
        <p class="section__paragraph">Мы — ваш надёжный партнёр в мире смартфонов. Наша компания занимается продажей
          широкого ассортимента современных мобильных устройств от ведущих производителей. В нашем ассортименте вы
          найдёте
          смартфоны на любой вкус и кошелёк.</p>
      </section>

      <section class="section" id="listing">
        <ul class="section__list">
          <li class="list__item">
            <header class="item__header">Доставка до двери</header>
            <span class="item__description">Мы позаботимся о том, чтобы вы получили свой новый смартфон в кратчайшие сроки и с максимальным комфортом.</span>
          </li>
          <li class="list__item">
            <header class="item__header">Установка и настройка</header>
            <span class="item__description">Наши специалисты помогут вам установить операционную систему и приложения, а также настроить смартфон под ваши нужды.</span>
          </li>
          <li class="list__item">
            <header class="item__header">Сервисное обслуживание</header>
            <span class="item__description">Мы гарантируем высокое качество наших товаров и всегда готовы помочь вам в случае возникновения вопросов или проблем.</span>
          </li>
        </ul>
      </section>

      <section class="section" id="about">
        <details class="details" id="details" open>
          <summary class="details__summary">Наши клиенты</summary>
          <div class="details__text">
            <div><img src="../../res/res-site-2/logo.svg" alt="logo">Газпром</div>
            <div><img src="../../res/res-site-2/logo.svg" alt="logo">Роснефть</div>
            <div><img src="../../res/res-site-2/logo.svg" alt="logo">Сбер</div>
            <div><img src="../../res/res-site-2/logo.svg" alt="logo">Т-Банк</div>
            <div><img src="../../res/res-site-2/logo.svg" alt="logo">Лукойл</div>
            <div><img src="../../res/res-site-2/logo.svg" alt="logo">М.Видео</div>
            <div><img src="../../res/res-site-2/logo.svg" alt="logo">Эльдорадо</div>
            <div><img src="../../res/res-site-2/logo.svg" alt="logo">DNS</div>
            <div><img src="../../res/res-site-2/logo.svg" alt="logo">Ситилинк</div>
          </div>
        </details>
      </section>

      <section class="section" id="contacts">
        <form id="form-contacts" class="form-contacts">
          <header class="form-contacts__header">Заказать звонок</header>
          <div class="form-contacts__description">Просто оставьте свои данные</div>

          <div class="form-contacts__input-container">
            <label for="form-contacts__input-name" class="input-container__label">Ваше имя</label>
            <input id="form-contacts__input-name" class="input-container__input" type="text" name="name"
                   placeholder="Иван Иванов" required>
          </div>
          <div class="form-contacts__input-container">
            <label for="form-contacts__input-phone" class="input-container__label">Номер телефона</label>
            <input id="form-contacts__input-phone" class="input-container__input" type="tel" name="tel"
                   placeholder="8-XXX-XXX-XX-XX" required>
          </div>
          <div class="form-contacts__input-container">
            <div class="form-contacts__input-radio-group">
              <label for="form-contacts__input-text-1" class="input-container__label">Продажа</label>
              <input id="form-contacts__input-text-1" class="input-container__input" type="radio" name="question-theme"
                     value="sell"
                     required>
            </div>
            <div class="form-contacts__input-radio-group">
              <label for="form-contacts__input-text-2" class="input-container__label">Ремонт</label>
              <input id="form-contacts__input-text-2" class="input-container__input" type="radio" name="question-theme"
                     value="fix"
                     required>
            </div>
            <div class="form-contacts__input-radio-group">
              <label for="form-contacts__input-text-3" class="input-container__label">Консультация</label>
              <input id="form-contacts__input-text-3" class="input-container__input" type="radio" name="question-theme"
                     value="info"
                     required>
            </div>
          </div>
          <div class="form-contacts__input-container">
            <label for="form-contacts__input-text" class="input-container__label">Любые пояснения</label>
            <textarea id="form-contacts__input-text" class="input-container__input" name="name"></textarea>
          </div>
          <input class="form-contacts__input-submit" type="submit" value="Отправить">
        </form>
      </section>


      <section class="section" id="calculator">
        <form id="form-calculator" class="form-calculator" action="javascript:void(0)">
          <header class="form-calculator__header">Мы расчитаем для вас стоимость</header>

          <div class="form-calculator__input-container">
            <label for="form-calculator__input-cost" class="input-calculator__label">Стоимость телефона</label>
            <input id="form-calculator__input-cost" class="input-calculator__input" type="number" min="0" name="cost"
                   placeholder="12000" required>
          </div>
          <div class="form-calculator__input-container">
            <label for="form-calculator__input-count" class="input-calculator__label">Количество телефонов</label>
            <input id="form-calculator__input-count" class="input-calculator__input" type="number" min="0" name="count"
                   placeholder="3" required>
          </div>

          <div class="form-calculator__result">Общая стоимость: <span id="form-calculator__result">0</span> $</div>
        </form>
      </section>
    </main>

    <footer class="footer">
      <div class="footer__left-column">
        <h2 class="footer__header">MOBILE STORE</h2>
        <small class="footer__description">Ваш надежный проводник в мир мобильных телефонов</small>

        <a class="footer__link" href="https://vk.com/bmstu1830" target="_blank"><img src="../../res/icons/vk-logo.svg"
                                                                                     alt="vk"><span>VK</span></a>
        <a class="footer__link" href="https://t.me/bmstu1830" target="_blank"><img
          src="../../res/icons/telegram-logo.svg"
          alt="tg"><span>TG</span></a>
        <a class="footer__link footer__link_email" href="mailto:contacts@mobile.phones" target="_blank"><img
          src="../../res/icons/email-logo.svg" alt="email"><span>contacts@mobile.phones</span></a>
      </div>

      <div class="footer__right-column">
        <a class="footer__link footer__link_telephone" href="tel:+79999999999"
           target="_blank"><span>+7 999 999 99 99</span></a>
      </div>
    </footer>
  </div>
</template>

<script>
import {nextTick} from "vue";

export default {
  props: {
    styled: Boolean,
    scripted: Boolean,
    scriptedSpa: Boolean,
    onlyAnchorLinks: Boolean,
  },

  data() {
    return {
      initialInnerHtml: '',
    }
  },

  mounted() {
    this.addPageScripts();
    this.initialInnerHtml = this.$el.innerHTML;
  },

  methods: {
    async reRender() {
      this.$el.innerHTML = this.initialInnerHtml;
      await nextTick();
      this.addPageScripts();
    },

    addPageScripts() {
      if (this.scriptedSpa) {
        this.addJsSpaScripts();
      } else if (this.scripted) {
        this.addCommonjsScripts();
      }
    },

    addCommonjsScripts() {
      // ------------------
      // Получаем HTML-элементы
      const formElement = document.getElementById('form-contacts');
      const inputNameElement = document.getElementById('form-contacts__input-name');
      const inputPhoneElement = document.getElementById('form-contacts__input-phone');
      const inputTextsElement = document.getElementById('form-contacts__input-text');
      formElement.addEventListener('submit', async (event) => {
        event.preventDefault();
        if (!await confirm('Подтвердите отправку данных')) {
          return;
        }
        const response = await fetch('/send-form', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: inputNameElement.value,
            phone: inputPhoneElement.value,
            question_theme: document.querySelector('input[name="question-theme"]:checked').value,
            texts: inputTextsElement.value,
          }),
        });
        if (!response.ok) {
          return;
        }
        formElement.innerHTML = '<header class="form-contacts__header">Спасибо<br>Мы свяжемся с вами!</header>';
      });
      // ------------------

      window.confirm = (message = '') => {
        // Создает Promise и сохранить его функцию resolve в переменную resolvePromiseFunction
        let resolvePromiseFunction;
        const promise = new Promise((resolve) => {
          resolvePromiseFunction = resolve;
        });

        // Создание элемента фона
        const modalElementRoot = document.createElement('div');
        modalElementRoot.style.position = 'fixed';
        modalElementRoot.style.inset = '0';
        modalElementRoot.style.background = '#00000080';
        modalElementRoot.style.backdropFilter = 'blur(10px)';

        // Создание элемента формы
        const modalElementForm = document.createElement('div');
        modalElementRoot.appendChild(modalElementForm);
        Object.assign(modalElementForm.style, {
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          minWidth: '300px',
          background: '#222',
          borderRadius: '20px',
          padding: '40px',
          color: '#fff',
        });

        // Создание элемента текста внутри формы
        const modalElementFormText = document.createElement('div');
        modalElementForm.appendChild(modalElementFormText);
        modalElementFormText.style.textAlign = 'center';
        modalElementFormText.style.fontSize = '18px';
        modalElementFormText.style.marginBottom = '20px';
        modalElementFormText.innerText = message;

        // Создание элементов кнопок внутри формы
        const modalElementFormButtons = [document.createElement('button'), document.createElement('button')];
        modalElementFormButtons.forEach(button => {
          modalElementForm.appendChild(button);
          button.style.padding = '10px';
          button.style.background = '#111';
          button.style.borderRadius = '4px';
          button.style.cursor = 'pointer';
          button.style.width = '50%';
        });
        modalElementFormButtons[0].innerText = 'Да';
        modalElementFormButtons[0].addEventListener('click', () => {
          resolvePromiseFunction(true);
          modalElementRoot.remove();
        });
        modalElementFormButtons[1].innerText = 'Нет';
        modalElementFormButtons[1].addEventListener('click', () => {
          resolvePromiseFunction(false);
          modalElementRoot.remove();
        });

        // Добавляем созданный корневой элемент в DOM
        document.body.appendChild(modalElementRoot);

        return promise;
      };
      // ------------------


      const galleryElements = document.querySelectorAll('#gallery > *');
      document.addEventListener('mousemove', (event) => {
        galleryElements.forEach(element => {
          // Эта часть необходима
          if (element.hasAttribute('data-is-fullscreen')) {
            return;
          }

          // Простой вариант
          element.setAttribute('style', `
            --x: ${event.pageX};
            --y: ${event.pageY};
            --total-width: ${window.innerWidth};
            --total-height: ${window.innerHeight};
          `);

          // Сложный вариант
          // const box = element.getBoundingClientRect();
          // const x = box.left - event.pageX;
          // const y = box.top - event.pageY;
          // const rotationValue = 60;
          // const translationValue = 60;
          // element.style.transform = `
          //   rotateX(${y / window.innerHeight * -rotationValue}deg)
          //   rotateY(${x / window.innerWidth * rotationValue}deg)
          //   translateX(${x / window.innerWidth * -translationValue}px)
          //   translateY(${y / window.innerHeight * -translationValue}px)
          // `
        });
      });
      // ------------------

      // Получаем HTML-элемент формы
      const formHTMLElement = document.getElementById('form-contacts');
      document.body.addEventListener('scroll', () => {
        // Получаем текущее положение элемента относительно области просмотра экрана
        const box = formHTMLElement.getBoundingClientRect();

        // Проверяем, попадает ли форма в обозначенную область
        if (box.top < window.innerHeight * 0.8 && box.bottom > window.innerHeight * 0.2) {
          // Если попадает, добавляем класс 'visible'
          formHTMLElement.classList.add('visible');
          return;
        }
        // Если не попадает, убираем класс 'visible'
        formHTMLElement.classList.remove('visible');
      });
      // ------------------

      // Получаем HTML-элемент раскрывающегося списка
      const detailsElement = document.getElementById('details');
      // Добавляем на него стили для обрезки выходящего за размеры блока контента и для плавной анимации максимальной высоты
      detailsElement.style.overflow = 'hidden'
      detailsElement.style.transition = 'max-height 0.4s ease'
      detailsElement.addEventListener('click', () => {
        // Если на элементе есть нет определенного атрибута, отвечающий за его состояние (открыт или нет),
        //  то элемент нужно развернуть (установить ему большую максимальную высоту, которая точно всегда будет больше его реальной высоты)
        if (!detailsElement.hasAttribute('open')) {
          detailsElement.style.maxHeight = '999px';
          return;
        }
        // Иначе его нужно закрыть (установить ему максимальную высоту около 20px)
        detailsElement.style.maxHeight = '20px';
      });
      // ------------------

      // Получаем HTML-элемент гарелеи изображений
      const galleryImageElements = document.querySelectorAll('#gallery > *');
      galleryImageElements.forEach(element => {
        element.addEventListener('click', () => {
          // Если на элементе атрибут "data-is-fullscreen" уже существует, его нужно убрать. Если не существует - добавить
          element.toggleAttribute('data-is-fullscreen')
          // Если на элементе существует атрибут "data-is-fullscreen", необходимо добавить на элемент стили для растягивания его на весь экран поверх всех элементов
          if (element.hasAttribute('data-is-fullscreen')) {
            element.style.position = 'fixed';
            element.style.zIndex = '999';
            element.style.top = '0';
            element.style.left = '0';
            element.style.width = '100%';
            element.style.height = '100%';
            element.style.background = '#00000080';
            element.style.objectFit = 'contain';
            element.style.transform = 'none'; // нужно, чтобы убрать стили от другого блока кода
            return;
          }
          // Иначе необходимо вернуть всё обратно и убрать эти стили
          element.style.position = 'initial';
          element.style.width = '';
          element.style.height = '';
        });
      });
      // ------------------

      // Получаем HTML-элементы двух полей ввода и элемент для вывода результата
      const inputCostElement = document.getElementById('form-calculator__input-cost');
      const inputCountElement = document.getElementById('form-calculator__input-count');
      const calculatedResultElement = document.getElementById('form-calculator__result');

      // Функция подсчета и обновления результата
      function calculateAndSetResult() {
        const result = +inputCostElement.value * +inputCountElement.value;
        calculatedResultElement.innerText = String(result) || '0';
      }

      // Добавляем EventListener'ы для вызова функции обновления при вводе данных в инпуты
      inputCostElement.addEventListener('input', calculateAndSetResult);
      inputCountElement.addEventListener('input', calculateAndSetResult);
      // -------------

      // Получаем HTML-элемент логотипа
      const logoElement = document.getElementById('header__logo');
      // Добавляем EventListener для показа информации
      // Самый простой способ - использовать функцию alert
      logoElement.addEventListener('contextmenu', () => {
        alert(`Дата сборки: 1 апр. 2023, 17:15\nВерсия: Beta-1.8.1`)
      });
    },

    addJsSpaScripts() {
      // -------------------------
      // Определяем класс роутера
      class Router {
        // Перечислим для удобства все поля этого класса
        rootElement;
        routes;
        currentRoute = null;

        constructor(element, routes) {
          // Если element не передан или это не объект класса HTMLElement, показываем ошибку и выходим
          if (!element instanceof HTMLElement) {
            console.error(`Element must be an instance of HTMLElement!`);
            return;
          }
          // Сохраняем элемент и роуты в поля класса
          this.rootElement = element;
          this.routes = routes;
          // Запускаем метод установки хэндлеров на события перехода по страницам.
          // Этот метод реализовывает кто-то другой в другом фрагменте
          this.setHrefEventCatchers();
          // Запускаем метод перехвата браузерных кнопок назад/вперед
          // Этот метод реализовывает кто-то другой в другом фрагменте
          this.setPopstateHandler();
        }
      }
      // Добавить Router как глобавльную константу, прописав его как свойство window
      window.Router = Router;
      // -------------------------

      Router.prototype.setHrefEventCatchers = function() {
        // Добавляем EventListener на <body>, в котором обратываем клики на ссылки
        document.body.addEventListener('click', (event) => {
          const clickedEl = event.target;
          // Ничего не делаем, если кликнут не элемент с тэгом <a>, и его атрибут href не является внутренней ссылкой (начинается с http:// или https://,
          // с tel:, mailto:, и др.), или является якорной ссылкой (начинается не с #). Это удобно проверить с помощью регулярного выражения
          const hrefAttr = clickedEl.getAttribute('href');
          if (
            (clickedEl.tagName !== 'A') ||
            (/^(\w+:|#)/gi.test(hrefAttr || ''))
          ) {
            return;
          }
          // Логируем событие перехвата ссылки, отменяем браузерный обычный переход по ссылке
          console.log("Router catches internal link route to:", hrefAttr);
          event.preventDefault();
          // Вызываем метод перехода на страницу.
          // Этот метод реализовывает кто-то другой в другом фрагменте
          this.goto(hrefAttr);
        });
      }
      // -------------------------

      Router.prototype.goto = function(path) {
        // Выполняем поиск по ключам роутов из this.routes. Если подходящий не найден, логируем ошибку и выходим
        const routeKey = Object.keys(this.routes).find(regExpStr => new RegExp(regExpStr).test(path));
        if (!routeKey) {
          console.error(`RegExp for papth ${path} not found in provided routes`)
          return;
        }
        // Если подходящий роут найден, запускаем метод render, в который передаем объект найденного роута
        // Этот метод реализовывает кто-то другой в другом фрагменте
        this.render(this.routes[routeKey]);
        // Добавляем ссылку в историю браузера (сама он не добавится, ведь переход браузера по ссылке мы перехватили)
        // Этот метод реализовывает кто-то другой в другом фрагменте
        this.pushPathToHistory(path);
      }
      // -------------------------

      Router.prototype.render = async function(route) {
        // Изменяем заголовок страницы документа на route.title
        document.title = route.title;
        // Вызываем метод анимации перехода по страницам и ожидаем разрешения на отрисовку новой страницы
        // Этот метод реализовывает кто-то другой в другом фрагменте
        await this.animateElementShowHide();
        // Заменяем всю разметку внутри рабочего элемента на route.html
        this.rootElement.innerHTML = route.html;
        // Ждем разбора и отрисовки браузером вставленного html (когда элементы появятся в DOM)
        // Этот метод реализовывает кто-то другой в другом фрагменте
        await this.nextTick();
        // Вызываем функцию unmount прыдыдущей страницы, вызываем функцию route.mount новой страницы
        if (this.currentRoute) {
          this.currentRoute.unmount();
        }
        route.mount();
        this.currentRoute = route;
      }
      // -------------------------

      Router.prototype.animateElementShowHide = function() {
        // Создаем промис, который будет возвращен из фукции, и сохраняем его функцию resolve, чтобы он мог разрешится,
        // когда разрешено будет вставить в рабочий элемент html-разметку новой страницы
        let resolvePromiseFunction; // Сюда можно сохранить функцию resolve
        const promise = new Promise(resolve => {resolvePromiseFunction = resolve});
        // Добавляем рабочему элементу стили для плавного скрытия содержимого
        this.rootElement.style.transition = 'opacity 0.2s ease';
        this.rootElement.style.opacity = '0';
        // Через *выберите сколько* миллисекунд резолвим промис (из-за этого сразу/ вставится html-разметка новой страницы) и плавно показываем
        setTimeout(() => {
          resolvePromiseFunction();
          this.rootElement.style.opacity = '1';
        }, 200);
        return promise;
      }
      // -------------------------

      Router.prototype.nextTick = function() {
        // Создаем промис, который будет возвращен из фукции, и сохраняем его функцию resolve, чтобы выполнить её позже
        let resolvePromiseFunction; // Сюда можно сохранить функцию resolve
        const promise = new Promise(resolve => {
          resolvePromiseFunction = resolve;
        });
        // Ожидаем появления элементов на странице и после этого вызываем функцию разрешения промиса
        requestAnimationFrame(resolvePromiseFunction);
        return promise;
      }
      // -------------------------

      Router.prototype.pushPathToHistory = function(path) {
        // Вызываем функцию добавления ссылки на страницу в браузерную историю
        history.pushState(null, null, path);
      }
      // -------------------------

      Router.prototype.setPopstateHandler = function() {
        // Добавляем прослушивание события перехода по браузерной истории.
        window.addEventListener('popstate', () => {
          // При срабатывании события вызываем метод goto передав в него текст, являющийся частью "path" от полного URL в адресной строке
          // Этот метод реализовывает кто-то другой в другом фрагменте
          this.goto(location.pathname);
        });
      }
      // -------------------------


      // Создаём объект роутера.
      // Структура объекта routes (второго параметра конструктора класса Router):
      // {
      //   '/some-path': {
      //      title: 'Название страницы',
      //      html: '<h1>HTML-код страницы</h1>',
      //      mount() {},
      //      unmount() {},
      //   },
      //   ...
      // }
      new Router(
        document.getElementById('main'),
        {
          '^/products': {
            title: 'Наша продукция',
            html: document.getElementById('products').outerHTML,
            mount() {},
            unmount() {},
          },
          '^/questions': {
            title: 'Кто мы?',
            html: document.getElementById('questions').outerHTML,
            mount() {},
            unmount() {},
          },
          '^/about': {
            title: 'О нас',
            html: document.getElementById('listing').outerHTML + document.getElementById('about').outerHTML,
            mount() {},
            unmount() {},
          },
          '^/contacts': {
            title: 'Контакты',
            html: document.getElementById('contacts').outerHTML + document.getElementById('calculator').outerHTML,
            mount() {
              document.getElementById('form-contacts').classList.add('visible')
            },
            unmount() {},
          },
        }
      )
    }
  }
}
</script>
