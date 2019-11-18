'use strict';

(function () {
  var similarPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var smallPhotoEntPressHandler = function (evt) {
    window.util.isEnterEvent(evt, window.preview.showBigPhoto);
  };
  window.picture = {
    getPhotoElement: function (photo) {
      var photoElement = similarPhotoTemplate.cloneNode(true);
      photoElement.querySelector('.picture__img').src = photo.url;
      photoElement.querySelector('.picture__likes').textContent = photo.likes;
      photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
      photoElement.addEventListener('click', function () {
        window.preview.showBigPhoto(photo);
      });
      photoElement.addEventListener('keydown', smallPhotoEntPressHandler);
      return photoElement;
    }
  };
})();
