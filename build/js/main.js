'use strict';

(function () {
  if (document.querySelector('.intro__text')) {
    var container = document.querySelector('.intro__text');

    container.addEventListener('click', function (evt) {
      evt.preventDefault();

      if (evt.target.getAttribute('href')) {
        var href = evt.target.getAttribute('href');
        var offsetTop = document.querySelector(href).offsetTop;

        scroll({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  }
})();

(function () {
  if (document.querySelectorAll('.callback-form form')) {
    var callbackForms = document.querySelectorAll('.callback-form form');

    if ((document.querySelector('input[name="name"]')) && (document.querySelector('input[type="tel"]')) && (document.querySelector('textarea'))) {
      callbackForms.forEach(function (form) {
        var userName = form.querySelector('input[name="name"]');
        var userPhone = form.querySelector('input[type="tel"]');
        var userQuestion = form.querySelector('textarea');

        form.addEventListener('submit', function () {
          localStorage.clear();

          localStorage.setItem('name', userName.value);
          localStorage.setItem('phone', userPhone.value);
          localStorage.setItem('questions', userQuestion.value);
        });
      });
    }
  }
})();

(function () {
  if ((document.querySelector('.header__button')) && (document.querySelector('.page')) && (document.querySelector('.modal')) && (document.querySelector('.modal__close-modal-button')) && (document.querySelector('input[name="name"]'))) {
    var openModalButton = document.querySelector('.header__button');

    var disablePage = function () {
      document.querySelector('.page').classList.add('page--disabled');
    };

    var enablePage = function () {
      document.querySelector('.page').classList.remove('page--disabled');
    };

    var closeModal = function (modal, buttonClose) {
      modal.classList.remove('modal--open');
      buttonClose.removeEventListener('click', closeModalClickHandler);
      document.removeEventListener('keydown', closeModalKeyPressHandler);
      document.removeEventListener('click', closeModalOutsideClickHandler);
    };

    var closeModalKeyPressHandler = function (evt) {
      var isEscKey = evt.key === 'Escape' || evt.key === 'Esc';

      if (isEscKey && document.querySelector('.modal--open')) {
        document.querySelector('.modal--open').classList.remove('modal--open');
        enablePage();
      }
    };

    var closeModalOutsideClickHandler = function (evt) {
      if (evt.target.classList.contains('modal')) {
        document.querySelector('.modal--open').classList.remove('modal--open');
        enablePage();
      }
    };

    var closeModalClickHandler = function (evt) {
      evt.preventDefault();

      var modal = evt.target.closest('.modal--open');
      var buttonClose = evt.target;
      closeModal(modal, buttonClose);
      enablePage();
    };

    var trapFocus = function (element) {
      var focusableEls = element.querySelectorAll('a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])');
      var firstFocusableEl = focusableEls[0];
      var lastFocusableEl = focusableEls[focusableEls.length - 1];
      var KEYCODE_TAB = 9;

      element.addEventListener('keydown', function (evt) {
        var isTabPressed = (evt.key === 'Tab' || evt.keyCode === KEYCODE_TAB);

        if (!isTabPressed) {
          return;
        }

        if (evt.shiftKey) {
          if (document.activeElement === firstFocusableEl) {
            lastFocusableEl.focus();
            evt.preventDefault();
          }
        } else {
          if (document.activeElement === lastFocusableEl) {
            firstFocusableEl.focus();
            evt.preventDefault();
          }
        }
      });
    };

    var openModalClickHandler = function (evt) {
      evt.preventDefault();

      var modal = document.querySelector('.modal');
      modal.classList.add('modal--open');
      disablePage();
      var userNameField = modal.querySelector('input[name="name"]');
      var modalCloseButton = modal.querySelector('.modal__close-modal-button');

      userNameField.focus();
      modalCloseButton.addEventListener('click', closeModalClickHandler);
      document.addEventListener('keydown', closeModalKeyPressHandler);
      document.addEventListener('click', closeModalOutsideClickHandler);
      trapFocus(modal);
    };

    openModalButton.addEventListener('click', openModalClickHandler);
  }
})();
