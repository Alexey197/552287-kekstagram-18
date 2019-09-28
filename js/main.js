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
// var imageUploadTitle = imageUploadForm.querySelector('.img-upload__title');
var imageUpLoadInput = imageUploadForm.querySelector('.img-upload__input');
var imageUploadOverlay = imageUploadForm.querySelector('.img-upload__overlay');
var effectLevelPin = imageUploadForm.querySelector('.effect-level__line');
var pinHandle = imageUploadForm.querySelector('.effect-level__pin');

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

// Инициализация

var initApp = function () {
  var photoArr = getPhotosArr(QUANTITY);
  similarListElement.appendChild(createPhotoElements(photoArr));
  getBigPhotoElement(photoArr[0]);
};

initApp();

// Загрузка изображения и показ формы редактирования

imageUpLoadInput.classList.remove('visually-hidden');

imageUpLoadInput.addEventListener('change', function () {
  imageUploadOverlay.classList.remove('hidden');
});

// захват элемента, перемещение и отпускание

pinHandle.addEventListener('mousedown', function (evt) {
  var effectLevelLineCoords = effectLevelPin.getBoundingClientRect();
  var barWidth = effectLevelPin.offsetWidth;
  var startCoords = evt.clientX;
  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    var shift = startCoords - moveEvt.clientX;
    startCoords = moveEvt.clientX;
    if (moveEvt.clientX > effectLevelLineCoords.right) {
      pinHandle.style.left = barWidth;
      startCoords = effectLevelLineCoords.right;
    } else if (moveEvt.clientX < effectLevelLineCoords.left) {
      pinHandle.style.left = 0;
      startCoords = effectLevelLineCoords.left;
    } else {
      pinHandle.style.left = ((pinHandle.offsetLeft - shift) * 100 / barWidth) + '%';
    }
    pinHandle.style.left = ((pinHandle.offsetLeft - shift) * 100 / barWidth) + '%';
  };
  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});


