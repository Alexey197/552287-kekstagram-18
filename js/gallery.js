'use strict';

(function () {
  var similarListElement = document.querySelector('.pictures');
  var successHandler = function (photos) {
    var fragment = document.createDocumentFragment();
    photos.forEach(function (item) {
      fragment.appendChild(window.picture.getPhotoElement(item));
    });
    similarListElement.appendChild(fragment);
  };


  var showPhotos = function () {
    window.backend.load(successHandler, window.message.getError);
  };
  showPhotos();
})();
