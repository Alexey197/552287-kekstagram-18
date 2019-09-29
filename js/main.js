'use strict';

var QUANTITY = 25;

var commentsQuantity = {
  MAX_NUMBER: 1,
  MIN_NUMBER: 4
};

var avatarQuantity = {
  MAX_NUMBER: 1,
  MIN_NUMBER: 6
};

var urlParams = {
  MAX_LIKE_NUMBER: 15,
  MIN_LIKE_NUMBER: 200,
  DESCRIPTION: ''
};

var pinHandleParams = {
  MIN_VALUE: 0,
  MAX_VALUE: 100,
  ABSOLUTE_MAX_VALUE: 455,
  RELATIVE_VALUE: '%'
};

var commentsParams = {
  SENTENCES: ['Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'],
  NAMES: ['Артем', 'Иван', 'Лариса', 'Виктор', 'Илья', 'Мария']
};

var similarPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture');
var similarListElement = document.querySelector('.pictures');
var bigPicture = document.querySelector('.big-picture');
var bigPictureComments = document.querySelector('.social__comments');
var bigPictureComment = document.querySelector('.social__comment');
var imageUploadForm = document.querySelector('.img-upload__form');
var imageUpLoadInput = imageUploadForm.querySelector('.img-upload__input');
var imageUploadOverlay = imageUploadForm.querySelector('.img-upload__overlay');
var pinHandle = imageUploadForm.querySelector('.effect-level__pin');
var effectsItems = imageUploadForm.querySelectorAll('.effects__radio');
var closeFormButton = imageUploadForm.querySelector('.img-upload__cancel');
// Случайный элемент массива

var getRandomArrElement = function (arr) {
  var arrElement = Math.floor(Math.random() * arr.length);
  return arr[arrElement];
};

// Случайное число от max до min

var getRandomNumber = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Создает объект комментария

var getCommentsItem = function () {
  return {
    avatar: 'img/avatar-' + getRandomNumber(avatarQuantity.MIN_NUMBER, avatarQuantity.MAX_NUMBER) + '.svg',
    message: getRandomArrElement(commentsParams.SENTENCES),
    name: getRandomArrElement(commentsParams.NAMES)
  };
};

// Создает массив комментариев

var getCommentsArr = function (arrLength) {
  var commentsArr = [];
  for (var i = 0; i < arrLength; i++) {
    commentsArr.push(getCommentsItem());
  }
  return commentsArr;
};

var getPhotoItem = function (photoNumber) {
  return {
    url: 'photos/' + photoNumber + '.jpg',
    description: '',
    likes: getRandomNumber(urlParams.MIN_LIKE_NUMBER, urlParams.MAX_LIKE_NUMBER),
    comments: getCommentsArr(getRandomNumber(commentsQuantity.MIN_NUMBER, commentsQuantity.MAX_NUMBER))
  };
};

var getPhotosArr = function (arrLength) {
  var photos = [];
  for (var i = 1; i < arrLength + 1; i++) {
    photos.push(getPhotoItem(i));
  }
  return photos;
};

// Создание DOM-элемента

var getPhotoElement = function (photo) {
  var photoElement = similarPhotoTemplate.cloneNode(true);
  photoElement.querySelector('.picture__img').src = photo.url;
  photoElement.querySelector('.picture__likes').textContent = photo.likes;
  photoElement.querySelector('.picture__comments').textContent = photo.comments;
  return photoElement;
};

// Отрисовка DOM-элементов DocumentFragment

var createPhotoElements = function (photos) {
  var fragment = document.createDocumentFragment();
  photos.forEach(function (item) {
    fragment.appendChild(getPhotoElement(item));
  });
  return fragment;
};


// Создание DOM-элемента коментария

var getCommentElement = function (comment) {
  var commentElement = bigPictureComment.cloneNode(true);
  commentElement.querySelector('.social__picture').src = comment.avatar;
  commentElement.querySelector('.social__picture').alt = comment.name;
  commentElement.querySelector('.social__text').textContent = comment.message;
  return commentElement;
};

// Удаляем

var getRemoveChildren = function (element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};

// Отрисовываем полноразмерное фото с комментариями

var getBigPhotoElement = function (photo) {
  var fragment = document.createDocumentFragment();
  bigPicture.querySelector('.big-picture__img img').src = photo.url;
  bigPicture.querySelector('.likes-count').textContent = photo.likes;
  bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
  bigPicture.querySelector('.social__caption').textContent = photo.description;
  getRemoveChildren(bigPictureComments);
  photo.comments.forEach(function (item) {
    fragment.appendChild(getCommentElement(item));
  });

  bigPictureComments.appendChild(fragment);
  bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
  bigPicture.querySelector('.comments-loader').classList.add('visually-hidden');
};

var onPinMove = function (evt) {
  var startPinPosition = parseFloat(pinHandle.style.left);
  var startCoordinate = evt.clientX;

  var onMouseMove = function (moveEvt) {
    var shift = moveEvt.clientX - startCoordinate;
    var currentPinPosition = startPinPosition + shift / pinHandleParams.ABSOLUTE_MAX_VALUE * pinHandleParams.MAX_VALUE;

    if (currentPinPosition < pinHandleParams.MIN_VALUE) {
      currentPinPosition = pinHandleParams.MIN_VALUE;
    } else if (currentPinPosition > pinHandleParams.MAX_VALUE) {
      currentPinPosition = pinHandleParams.MAX_VALUE;
    }

    pinHandle.style.left = currentPinPosition + '%';
  };

  var onMouseUp = function () {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
};

var formOpen = function () {
  imageUploadOverlay.classList.remove('visually-hidden');
  pinHandle.addEventListener('mousedown', onPinMove);
  closeForm();
  for (var i = 0; i < effectsItems.length; i++) {
    effectsItems[i].addEventListener('change', effectsItemsSwitch);
  }
};

var effectsItemsSwitch = function () {
  pinHandle.style.left = pinHandleParams.MIN_VALUE + pinHandleParams.RELATIVE_VALUE;
};

var closeForm = function () {
  closeFormButton.addEventListener('click', function () {
    imageUploadOverlay.classList.add('visually-hidden');
    pinHandle.removeEventListener('mousedown', onPinMove);
  });
};

var initApp = function () {
  var photoArr = getPhotosArr(QUANTITY);
  similarListElement.appendChild(createPhotoElements(photoArr));
  getBigPhotoElement(photoArr[0]);
  imageUpLoadInput.addEventListener('change', function () {
    imageUploadOverlay.classList.remove('hidden');
    formOpen();
  });
};

initApp();

