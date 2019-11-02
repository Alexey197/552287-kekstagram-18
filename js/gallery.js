'use strict';

(function () {
  var similarListElement = document.querySelector('.pictures');
  var renderListPictures = function (photos) {
    var fragment = document.createDocumentFragment();
    photos.forEach(function (item) {
      fragment.appendChild(window.picture.getPhotoElement(item));
    });
    return fragment;
  };
  window.gallery = {
    update: function (data) {
      similarListElement.appendChild(renderListPictures(data));
    }
  };
})();


