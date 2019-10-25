'use strict';

(function () {
  var error = document.querySelector('#error').content.querySelector('.error');
  var success = document.querySelector('#success').content.querySelector('.success');
  var mainContainer = document.querySelector('main');
  var getErrorMessage = function (errorMessage) {
    var errorElement = error.cloneNode(true);
    var errorButtons = errorElement.querySelectorAll('.error__button');
    var removeErrorElement = function () {
      mainContainer.removeChild(errorElement);
    };
    errorButtons.forEach(function (item) {
      item.addEventListener('click', function (evt) {
        evt.preventDefault();
        removeErrorElement();
      });
    });
    document.addEventListener('keydown', function (evt) {
      if (mainContainer.contains(errorElement)) {
        window.util.isEscEvent(evt, removeErrorElement);
      }
    });
    document.addEventListener('click', function () {
      if (mainContainer.contains(errorElement)) {
        removeErrorElement();
      }
    });
    errorElement.querySelector('.error__title').textContent = errorMessage;
    mainContainer.insertAdjacentElement('afterbegin', errorElement);
  };
  var getSuccessMessage = function () {
    var successElement = success.cloneNode(true);
    var successButton = successElement.querySelector('.success__button');
    successButton.addEventListener('click', function (evt) {
      evt.preventDefault();
      removeSuccessElement();
    });
    var removeSuccessElement = function () {
      mainContainer.removeChild(successElement);
    };
    document.addEventListener('keydown', function (evt) {
      if (mainContainer.contains(successElement)) {
        window.util.isEscEvent(evt, removeSuccessElement);
      }
    });
    document.addEventListener('click', function () {
      if (mainContainer.contains(successElement)) {
        removeSuccessElement();
      }
    });
    mainContainer.insertAdjacentElement('afterbegin', successElement);
  };

  window.messages = {
    getError: getErrorMessage,
    getSuccess: getSuccessMessage
  };
})();
