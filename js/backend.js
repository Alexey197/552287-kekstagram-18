'use strict';

(function () {
  var SUCCESS_CODE = 200;
  var Urls = {
    LOAD: 'https://js.dump.academy/kekstagram/data',
    SAVE: 'https://js.dump.academy/kekstagram'
  };
  var getBackendXhr = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_CODE) {
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
      xhr.open('GET', Urls.LOAD);
      xhr.send();
    },
    save: function (data, onLoad, onError) {
      var xhr = getBackendXhr(onLoad, onError);
      xhr.open('POST', Urls.SAVE);
      xhr.send(data);
    }
  };
})();
