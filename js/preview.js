'use strict';

(function () {
  var COMMENTS_LENGTH = '140';
  var COMMENTS_AMOUNT = 5;
  var loadedComments = [];
  var currentCommentsAmount = 0;
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureComments = document.querySelector('.social__comments');
  var bigPictureComment = document.querySelector('.social__comment');
  var bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
  var commentCount = bigPicture.querySelector('.social__comment-count');
  var commentsLoader = bigPicture.querySelector('.social__comments-loader');
  var commentsCount = bigPicture.querySelector('.comments-count');
  var socialCommentsButton = document.querySelector('.social__comments-loader');

  var getCommentElement = function (comment) {
    var commentElement = bigPictureComment.cloneNode(true);
    commentElement.querySelector('.social__picture').src = comment.avatar;
    commentElement.querySelector('.social__picture').alt = comment.name;
    commentElement.querySelector('.social__text').textContent = comment.message;
    return commentElement;
  };

  var getBigPhotoComments = function (comments) {
    var fragment = document.createDocumentFragment();
    if (comments.length <= COMMENTS_AMOUNT) {
      commentsLoader.classList.add('visually-hidden');
    } else {
      commentsLoader.classList.remove('visually-hidden');
    }
    comments.splice(0, COMMENTS_AMOUNT).forEach(function (item) {
      fragment.appendChild(getCommentElement(item));
      currentCommentsAmount++;
    });
    commentCount.textContent = currentCommentsAmount + ' из ';
    commentCount.appendChild(commentsCount);
    bigPictureComments.appendChild(fragment);
  };

  var getBigPhotoElement = function (photo) {
    currentCommentsAmount = 0;

    window.util.getRemoveChildren(bigPictureComments);

    loadedComments = photo.comments.slice();

    bigPicture.querySelector('.big-picture__img img').src = photo.url;
    bigPicture.querySelector('.likes-count').textContent = photo.likes;
    commentsCount.textContent = photo.comments.length;
    bigPicture.querySelector('.social__caption').textContent = photo.description;
    bigPicture.querySelector('.social__footer-text').setAttribute('maxlength', COMMENTS_LENGTH);
    bigPicture.querySelector('.social__footer-text').addEventListener('focus', function () {
      document.removeEventListener('keydown', onBigPhotoEscPress);
    });
    bigPicture.querySelector('.social__footer-text').addEventListener('blur', function () {
      document.addEventListener('keydown', onBigPhotoEscPress);
    });

    getBigPhotoComments(loadedComments);
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
    socialCommentsButton.removeEventListener('click', commentsButtonClickHandler);
  };

  var commentsButtonClickHandler = function (evt) {
    evt.preventDefault();
    getBigPhotoComments(loadedComments);
  };

  var bigPhotoInit = function () {
    bigPhotoOpenHandler();
    bigPhotoCloseHandler();
  };

  bigPhotoInit();

  window.preview = {
    showBigPhoto: function (photo) {
      bigPicture.classList.remove('hidden');
      socialCommentsButton.addEventListener('click', commentsButtonClickHandler);
      bigPictureCancel.addEventListener('click', hideBigPhoto);
      document.addEventListener('keydown', onBigPhotoEscPress);
      getBigPhotoElement(photo);
    }
  };
})();
