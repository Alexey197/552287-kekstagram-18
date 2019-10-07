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

var errorCodesText = {
  'hashtags_unique': 'Один и тот же хэш-тег не может быть использован дважды.',
  'hashtags_amount': 'Нельзя указать больше пяти хэш-тегов.',
  'hashtag_length': 'Максимальная длина одного хэш-тега 20 символов, включая решётку.',
  'hashtag_diez': 'Хеш-тег не может состоять только из одной решётки.',
  'hashtag_start_dies': 'Хэш-тег начинается с символа # (решётка).'
};

var filters = {
  NONE: {
    CLASS_NAME: 'effects__preview--none',
    FILTER: '',
    MAX_VALUE: 0,
    HIDDEN_SLIDER: true
  },
  CHROME: {
    CLASS_NAME: 'effects__preview--chrome',
    FILTER: 'grayscale',
    MIN_VALUE: 0,
    MAX_VALUE: 1,
    FILTER_UNIT: ''
  },
  SEPIA: {
    CLASS_NAME: 'effects__preview--sepia',
    FILTER: 'sepia',
    MIN_VALUE: 0,
    MAX_VALUE: 1,
    FILTER_UNIT: ''
  },
  MARVIN: {
    CLASS_NAME: 'effects__preview--marvin',
    FILTER: 'invert',
    MIN_VALUE: 0,
    MAX_VALUE: 100,
    FILTER_UNIT: '%'
  },
  PHOBOS: {
    CLASS_NAME: 'effects__preview--phobos',
    FILTER: 'blur',
    MIN_VALUE: 0,
    MAX_VALUE: 3,
    FILTER_UNIT: 'px'
  },
  HEAT: {
    CLASS_NAME: 'effects__preview--heat',
    FILTER: 'brightness',
    MIN_VALUE: 1,
    MAX_VALUE: 3,
    FILTER_UNIT: ''
  }
};

var scale = {
  MAX_VALUE: 100,
  MIN_VALUE: 25,
  STEP: 25,
  SCALE_UNIT: '%'
};

var similarPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture');
var similarListElement = document.querySelector('.pictures');
var bigPicture = document.querySelector('.big-picture');
var bigPictureComments = document.querySelector('.social__comments');
var bigPictureComment = document.querySelector('.social__comment');
var bigPictureCancel = document.querySelector('.big-picture__cancel');
var imageUploadForm = document.querySelector('.img-upload__form');
var imageUpLoadInput = imageUploadForm.querySelector('.img-upload__input');
var imageUploadOverlay = imageUploadForm.querySelector('.img-upload__overlay');
var pinHandle = imageUploadForm.querySelector('.effect-level__pin');
var effectsItems = imageUploadForm.querySelectorAll('.effects__radio');
var effects = imageUploadForm.querySelector('.effects');
var effectSlider = imageUploadForm.querySelector('.effect-level');
var closeFormButton = imageUploadForm.querySelector('.img-upload__cancel');
var textHashtags = imageUploadForm.querySelector('.text__hashtags');
var textDescription = imageUploadForm.querySelector('.text__description');
var uploadPhoto = imageUploadForm.querySelector('.img-upload__preview img');
var scaleSmaller = imageUploadForm.querySelector('.scale__control--smaller');
var scaleBigger = imageUploadForm.querySelector('.scale__control--bigger');
var scaleValue = imageUploadForm.querySelector('.scale__control--value');

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
    var effectPinValue = Math.round(currentPinPosition);
    var changePinHandleObj = {
      'chrome': 'grayscale(' + effectPinValue / pinHandleParams.MAX_VALUE + ')',
      'sepia': 'sepia(' + effectPinValue / pinHandleParams.MAX_VALUE + ')',
      'marvin': 'invert(' + effectPinValue + filters.MARVIN.FILTER_UNIT + ')',
      'phobos': 'blur(' + effectPinValue / pinHandleParams.MAX_VALUE * (filters.PHOBOS.MAX_VALUE - filters.PHOBOS.MIN_VALUE) + filters.PHOBOS.FILTER_UNIT + ')',
      'heat': 'brightness(' + (effectPinValue / pinHandleParams.MAX_VALUE * (filters.HEAT.MAX_VALUE - filters.HEAT.MIN_VALUE) + filters.HEAT.MIN_VALUE) + ')'
    };
    var inputValue = imageUploadForm.effect.value;
    uploadPhoto.style.filter = changePinHandleObj[inputValue];
  };

  var onMouseUp = function () {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
};

var changeEffectsObj = {
  'chrome': filters.CHROME.CLASS_NAME,
  'sepia': filters.SEPIA.CLASS_NAME,
  'marvin': filters.MARVIN.CLASS_NAME,
  'phobos': filters.PHOBOS.CLASS_NAME,
  'heat': filters.HEAT.CLASS_NAME
};

var changeEffects = function () {
  var inputValue = imageUploadForm.effect.value;
  uploadPhoto.classList.add(changeEffectsObj[inputValue]);
  if (inputValue !== 'none') {
    effectSlider.classList.remove('hidden');
  }
};

var removePictureSettings = function () {
  effectSlider.classList.add('hidden');
  uploadPhoto.removeAttribute('class');
  uploadPhoto.removeAttribute('style');
};

var onPictureSettings = function () {
  removePictureSettings();
  changeEffects();
};

var effectsItemsSwitch = function () {
  pinHandle.style.left = pinHandleParams.MIN_VALUE + pinHandleParams.RELATIVE_VALUE;
};

var setScaleDecrease = function () {
  var scaleValueNumber = parseInt(scaleValue.value, 10);
  if (scaleValueNumber > scale.MIN_VALUE) {
    scaleValueNumber -= scale.STEP;
  }
  uploadPhoto.style.transform = ('scale(' + scaleValueNumber / 100 + ')');
  scaleValue.value = scaleValueNumber + scale.SCALE_UNIT;
};

var setScaleIncrease = function () {
  var scaleValueNumber = parseInt(scaleValue.value, 10);
  if (scaleValueNumber < scale.MAX_VALUE) {
    scaleValueNumber += scale.STEP;
  }
  uploadPhoto.style.transform = ('scale(' + scaleValueNumber / 100 + ')');
  scaleValue.value = scaleValueNumber + scale.SCALE_UNIT;
};

var formOpen = function () {
  imageUploadOverlay.classList.remove('visually-hidden');
  pinHandle.addEventListener('mousedown', onPinMove);
  textHashtags.addEventListener('blur', hashtagsValidation);
  textDescription.addEventListener('blur', descriptionValidation);
  imageUploadForm.addEventListener('invalid', function (e) {
    e.target.classList.add('red');
  }, true);
  for (var i = 0; i < effectsItems.length; i++) {
    effectsItems[i].addEventListener('change', effectsItemsSwitch);
  }
  effects.addEventListener('change', onPictureSettings);
  pinHandle.addEventListener('mouseup', onPinMove);
  scaleValue.value = scale.MAX_VALUE + scale.SCALE_UNIT;
  scaleSmaller.addEventListener('click', setScaleDecrease);
  scaleBigger.addEventListener('click', setScaleIncrease);
  closeForm();
};

var closeForm = function () {
  closeFormButton.addEventListener('click', function () {
    imageUploadOverlay.classList.add('visually-hidden');
    pinHandle.removeEventListener('mousedown', onPinMove);
    textHashtags.removeEventListener('change', hashtagsValidation);
    textHashtags.removeEventListener('blur', hashtagsValidation);
    textDescription.removeEventListener('blur', descriptionValidation);
    imageUploadForm.removeEventListener('invalid', function (e) {
      e.target.classList.add('red');
    }, true);
    for (var i = 0; i < effectsItems.length; i++) {
      effectsItems[i].removeEventListener('change', effectsItemsSwitch);
    }
    effects.removeEventListener('change', onPictureSettings);
    pinHandle.removeEventListener('mouseup', onPinMove);
    scaleValue.value = scale.MAX_VALUE + scale.SCALE_UNIT;
    scaleSmaller.removeEventListener('click', setScaleDecrease);
    scaleBigger.removeEventListener('click', setScaleIncrease);
  });
};

var isUniqueElem = function (item, index, curArr) {
  return curArr.indexOf(item) === index;
};

var hashtagsValidation = function () {
  var hashtagArr = textHashtags.value.toLowerCase().split(' ');
  var message = [];

  var errorCodes = {
    'hashtags_unique': false,
    'hashtags_amount': false,
    'hashtag_length': false,
    'hashtag_diez': false,
    'hashtag_start_dies': false
  };

  if (!hashtagArr.every(isUniqueElem)) {
    errorCodes['hashtags_unique'] = true;
  }

  if (hashtagArr.length > 5) {
    errorCodes['hashtags_amount'] = true;
  }

  for (var i = 0; i < hashtagArr.length; i++) {
    var firstCharacter = hashtagArr[i][0];
    if (hashtagArr[i].length > 20) {
      errorCodes['hashtag_length'] = true;
    } else if (firstCharacter === '#' && hashtagArr[i].length === 1) {
      errorCodes['hashtag_diez'] = true;
    } else if (hashtagArr[i][0] !== '#') {
      errorCodes['hashtag_start_dies'] = true;
    }
  }

  Object.keys(errorCodes).forEach(function (it) {
    if (errorCodes[it]) {
      message.push(errorCodesText[it]);
    }
  });

  textHashtags.setCustomValidity(message.join(' '));
};
var descriptionValidation = function () {
  if (textDescription.value.length > 140) {
    textDescription.setCustomValidity('Длина комментария не может составлять больше 140 символов.');
  } else {
    textDescription.setCustomValidity('');
  }
};

var showBigPhoto = function () {
  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
  bigPicture.querySelector('.comments-loader').classList.add('visually-hidden');
  getBigPhotoElement(getPhotosArr(QUANTITY)[0]);
};

var hideBigPhoto = function () {
  bigPictureCancel.addEventListener('click', function () {
    bigPicture.classList.add('hidden');
  });
};

var initApp = function () {
  var photoArr = getPhotosArr(QUANTITY);
  similarListElement.appendChild(createPhotoElements(photoArr));
  showBigPhoto(photoArr[0]);
  hideBigPhoto();
  imageUpLoadInput.addEventListener('change', function () {
    imageUploadOverlay.classList.remove('hidden');
    effectSlider.classList.add('hidden');
    formOpen();
  });
  imageUploadForm.setAttribute('action', 'https://js.dump.academy/kekstagram');
};

initApp();


