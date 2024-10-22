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


  .section .list {
    padding: 20px 0 20px 20px;
  }

  .section .list__item {
    padding: 10px;
  }

  .section .item__header {
    //font-weight: bold;
    font-size: 20px;
    text-transform: uppercase;
  }

  .section .item__description {
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


  .footer {
    padding: 40px 30px 20px;
    background: #151515;
    display: flex;
    justify-content: space-between;
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
      <div class="header__logo">
        <div class="header__logo__top">Mobile</div>
        <div class="header__logo__bottom">
          <span>store</span>
          <img src="../../res/res-site-2/logo.svg" alt="logo">
        </div>
      </div>

      <nav class="navbar">
        <a class="navbar__link" href="#products">Продукция</a>
        <a class="navbar__link" href="#questions">Вопросы</a>
        <a class="navbar__link" href="#about">О нас</a>
        <a class="navbar__link" href="#contacts">Контакты</a>
      </nav>
    </header>

    <main class="main">
      <section class="section">
        <header class="section__header" id="products">Наша продукция</header>
        <div class="gallery">
          <img class="gallery__image" src="../../res/res-site-2/phone1.jpg" alt="phone">
          <img class="gallery__image" src="../../res/res-site-2/phone2.webp" alt="phone">
          <img class="gallery__image" src="../../res/res-site-2/phone3.webp" alt="phone">
        </div>
      </section>

      <hr>

      <section class="section">
        <header class="section__header" id="questions">Кто мы?</header>
        <p class="section__paragraph">Мы — ваш надёжный партнёр в мире смартфонов. Наша компания занимается продажей
          широкого ассортимента современных мобильных устройств от ведущих производителей. В нашем ассортименте вы найдёте
          смартфоны на любой вкус и кошелёк.</p>
      </section>

      <section class="section">
        <header class="section__header">Наши услуги</header>
        <p class="section__paragraph">
          Мы предлагаем не только продажу смартфонов, но и ряд дополнительных услуг, которые сделают процесс покупки
          максимально комфортным:
        </p>
        <ul class="list">
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

      <section class="section">
        <details id="about" class="details" open>
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

      <section class="section">
        <form id="contacts" class="form-contacts" action="javascript:alert('Форма отправлена')">
          <header class="form-contacts__header">Заказать звонок</header>
          <div class="form-contacts__description">Просто оставьте свои данные</div>

          <div class="form-contacts__input-container">
            <label for="form-contacts__input-name" class="input-container__label">Ваше имя</label>
            <input id="form-contacts__input-name" class="input-container__input" type="text" name="name"
                   placeholder="Иван Иванов" required>
          </div>
          <div class="form-contacts__input-container">
            <label for="form-contacts__input-phone" class="input-container__label">Номер телефона:</label>
            <input id="form-contacts__input-phone" class="input-container__input" type="tel" name="tel"
                   placeholder="8-XXX-XXX-XX-XX" required>
          </div>
          <div class="form-contacts__input-container">
            <div class="form-contacts__input-radio-group">
              <label for="form-contacts__input-text-1" class="input-container__label">Продажа</label>
              <input id="form-contacts__input-text-1" class="input-container__input" type="radio" name="question-theme"
                     required>
            </div>
            <div class="form-contacts__input-radio-group">
              <label for="form-contacts__input-text-2" class="input-container__label">Ремонт</label>
              <input id="form-contacts__input-text-2" class="input-container__input" type="radio" name="question-theme"
                     required>
            </div>
            <div class="form-contacts__input-radio-group">
              <label for="form-contacts__input-text-3" class="input-container__label">Консультация</label>
              <input id="form-contacts__input-text-3" class="input-container__input" type="radio" name="question-theme"
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
    </main>

    <footer class="footer">
      <div class="footer__left-column">
        <a class="footer__link" href="https://vk.com/bmstu1830" target="_blank"><img src="../../res/icons/vk-logo.svg"
                                                                                     alt="vk"><span>VK</span></a>
        <a class="footer__link" href="https://t.me/bmstu1830" target="_blank"><img src="../../res/icons/telegram-logo.svg"
                                                                                   alt="tg"><span>TG</span></a>
        <a class="footer__link footer__link_email" href="mailto:contacts@mobile.phones" target="_blank"><img
          src="../../res/icons/email-logo.svg" alt="email"><span>contacts@mobile.phones</span></a>
      </div>

      <div class="footer__right-column">
        <a class="footer__link footer__link_telephone" href="tel:+79999999999" target="_blank"><span>+7 999 999 99 99</span></a>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  props: {
    styled: Boolean,
  }
}
</script>
