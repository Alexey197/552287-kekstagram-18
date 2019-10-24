'use strict';

(function () {
  var error = document.querySelector('#error').content.querySelector('.error');
  var mainContainer = document.querySelector('main');
  var getErrorMessage = function (errorMessage) {
    error.cloneNode(true);
    error.querySelector('.error__title').textContent = errorMessage;
    mainContainer.insertAdjacentElement('afterbegin', error);
  };

  window.message = {
    getError: getErrorMessage
  };
})();
