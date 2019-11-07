'use strict';

(function () {
  var similarListElement = document.querySelector('.pictures');
  var filters = document.querySelector('.img-filters');
  var picturesNodes = [];
  var pictures = [];
  var renderListPictures = function (photos) {
    var fragment = document.createDocumentFragment();
    photos.forEach(function (item) {
      var node = window.picture.getPhotoElement(item);
      fragment.appendChild(node);
      picturesNodes.push(node);
    });
    return fragment;
  };

  var removePictureNodes = function () {
    picturesNodes.forEach(function (node) {
      node.remove();
    });
    picturesNodes = [];
  };

  var successHandler = function (data) {
    pictures = data.slice();
    window.gallery.update(data);
    filters.classList.remove('img-filters--inactive');
  };
  window.backend.load(successHandler, window.messages.getError);

  window.gallery = {
    update: function () {
      removePictureNodes();
      var data = window.filter(pictures);
      similarListElement.appendChild(renderListPictures(data));
    }
  };
})();


