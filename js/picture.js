'use strict';

(function () {
  var similarPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var onSmallPhotoEntPress = function (evt) {
    window.util.isEnterEvent(evt, window.preview.showBigPhoto);
  };
  // var getPhotoElement = function (photo) {
  //   var photoElement = similarPhotoTemplate.cloneNode(true);
  //   photoElement.querySelector('.picture__img').src = photo.url;
  //   photoElement.querySelector('.picture__likes').textContent = photo.likes;
  //   photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
  //   photoElement.addEventListener('click', function () {
  //     showBigPhoto(photo);
  //   });
  //   photoElement.addEventListener('keydown', onSmallPhotoEntPress);
  //   return photoElement;
  // };

  // Отрисовка DOM-элементов DocumentFragment

  // var createPhotoElements = function (photos) {
  //   var fragment = document.createDocumentFragment();
  //   photos.forEach(function (item) {
  //     fragment.appendChild(getPhotoElement(item));
  //   });
  //   return fragment;
  // };
  window.picture = {
    getPhotoElement: function (photo) {
      var photoElement = similarPhotoTemplate.cloneNode(true);
      photoElement.querySelector('.picture__img').src = photo.url;
      photoElement.querySelector('.picture__likes').textContent = photo.likes;
      photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
      photoElement.addEventListener('click', function () {
        window.preview.showBigPhoto(photo);
      });
      photoElement.addEventListener('keydown', onSmallPhotoEntPress);
      return photoElement;
    }
  };
})();
