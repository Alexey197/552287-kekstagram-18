'use strict';

(function () {
  var xhrParams = {
    URL_LOAD: 'https://js.dump.academy/kekstagram/data',
    ERROR_CODE: 200
  };
  var getBackendXhr = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === xhrParams.ERROR_CODE) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    return xhr;
  };

  window.backend = {
    load: function (onLoad, onError) {
      var xhr = getBackendXhr(onLoad, onError);
      xhr.open('GET', xhrParams.URL_LOAD);
      xhr.send();
    }
  };
})();
