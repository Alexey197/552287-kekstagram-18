'use strict';

(function () {
  var error = document.querySelector('#error').content.querySelector('.error');
  var success = document.querySelector('#success').content.querySelector('.success');
  var mainContainer = document.querySelector('main');
  var errorElement = error.cloneNode(true);
  var successElement = success.cloneNode(true);

  var getRemoveElement = function () {
    if (mainContainer.contains(errorElement)) {
      mainContainer.removeChild(errorElement);
    } else if (mainContainer.contains(successElement)) {
      mainContainer.removeChild(successElement);
    }
  };

  var elementRemoveClickHandler = function () {
    getRemoveElement();
  };

  var buttonCloseClickHandler = function (evt) {
    evt.preventDefault();
    getRemoveElement();
  };

  var documentEscCloseHandle = function (evt) {
    window.util.isEscEvent(evt, getRemoveElement);
  };

  var getErrorMessage = function (errorMessage) {
    var errorButtons = errorElement.querySelectorAll('.error__button');

    errorButtons.forEach(function (item) {
      item.addEventListener('click', buttonCloseClickHandler);
    });

    document.addEventListener('keydown', documentEscCloseHandle);
    document.addEventListener('click', elementRemoveClickHandler);
    errorElement.querySelector('.error__title').textContent = errorMessage;
    mainContainer.insertAdjacentElement('afterbegin', errorElement);
  };

  var getSuccessMessage = function () {
    var successButton = successElement.querySelector('.success__button');
    successButton.addEventListener('click', buttonCloseClickHandler);

    document.addEventListener('keydown', documentEscCloseHandle);
    document.addEventListener('click', elementRemoveClickHandler);
    mainContainer.insertAdjacentElement('afterbegin', successElement);
  };

  window.messages = {
    getError: getErrorMessage,
    getSuccess: getSuccessMessage
  };
})();
