'use strict';

(function () {

  var QUANTITY = 25;
  var similarListElement = document.querySelector('.pictures');

  var createPhotoElements = function (photos) {
    var fragment = document.createDocumentFragment();
    photos.forEach(function (item) {
      fragment.appendChild(window.picture.getPhotoElement(item));
    });
    return fragment;
  };
  var initApp = function () {
    var photoArr = window.data.getPhotosArr(QUANTITY);
    similarListElement.appendChild(createPhotoElements(photoArr));
  };

  initApp();

})();
