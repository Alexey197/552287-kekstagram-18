'use strict';

(function () {
  var COMMENTS_LENGTH = '140';
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureComments = document.querySelector('.social__comments');
  var bigPictureComment = document.querySelector('.social__comment');
  var bigPictureCancel = document.querySelector('.big-picture__cancel');

  var getCommentElement = function (comment) {
    var commentElement = bigPictureComment.cloneNode(true);
    commentElement.querySelector('.social__picture').src = comment.avatar;
    commentElement.querySelector('.social__picture').alt = comment.name;
    commentElement.querySelector('.social__text').textContent = comment.message;
    return commentElement;
  };

  var getBigPhotoElement = function (photo) {
    bigPicture.querySelector('.big-picture__img img').src = photo.url;
    bigPicture.querySelector('.likes-count').textContent = photo.likes;
    bigPicture.querySelector('.comments-count').textContent = photo.comments;
    bigPicture.querySelector('.social__caption').textContent = photo.description;
    bigPicture.querySelector('.social__footer-text').setAttribute('maxlength', COMMENTS_LENGTH);
    bigPicture.querySelector('.social__footer-text').addEventListener('focus', function () {
      document.removeEventListener('keydown', onBigPhotoEscPress);
    });
    bigPicture.querySelector('.social__footer-text').addEventListener('blur', function () {
      document.addEventListener('keydown', onBigPhotoEscPress);
    });
    var fragment = document.createDocumentFragment();
    window.util.getRemoveChildren(bigPictureComments);
    photo.comments.forEach(function (item) {
      fragment.appendChild(getCommentElement(item));
    });
    bigPictureComments.appendChild(fragment);
  };
  var hideBigPhoto = function () {
    bigPicture.classList.add('hidden');
  };

  var onBigPhotoEscPress = function (evt) {
    window.util.isEscEvent(evt, hideBigPhoto);
  };
  var bigPhotoOpenHandler = function () {
    document.addEventListener('keydown', onBigPhotoEscPress);
    bigPictureCancel.addEventListener('click', hideBigPhoto);
  };

  var bigPhotoCloseHandler = function () {
    document.removeEventListener('keydown', onBigPhotoEscPress);
    bigPictureCancel.removeEventListener('click', hideBigPhoto);
  };
  var bigPhotoInit = function () {
    bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
    bigPicture.querySelector('.comments-loader').classList.add('visually-hidden');
    bigPhotoOpenHandler();
    bigPhotoCloseHandler();
    hideBigPhoto();
  };
  bigPhotoInit();
  window.preview = {
    showBigPhoto: function (photo) {
      bigPicture.classList.remove('hidden');
      bigPictureCancel.addEventListener('click', hideBigPhoto);
      document.addEventListener('keydown', onBigPhotoEscPress);
      getBigPhotoElement(photo);
    }
  };
})();
