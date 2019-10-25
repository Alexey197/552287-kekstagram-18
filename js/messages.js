'use strict';

(function () {
  var error = document.querySelector('#error').content.querySelector('.error');
  var success = document.querySelector('#success').content.querySelector('.success');
  var mainContainer = document.querySelector('main');
  var getErrorMessage = function (errorMessage) {
    var errorElement = error.cloneNode(true);
    errorElement.querySelector('.error__title').textContent = errorMessage;
    mainContainer.insertAdjacentElement('afterbegin', errorElement);
  };
  var getSuccessMessage = function () {
    var successElement = success.cloneNode(true);
    var successButton = successElement.querySelector('.success__button');
    successButton.addEventListener('click', function (evt) {
      evt.preventDefault();
      mainContainer.removeChild(successElement);
    });
    mainContainer.insertAdjacentElement('afterbegin', successElement);
  };

  window.messages = {
    getError: getErrorMessage,
    getSuccess: getSuccessMessage
  };
})();
