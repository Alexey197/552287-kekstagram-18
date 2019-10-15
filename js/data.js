'use strict';

(function () {

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
    NAMES: ['Артем', 'Иван', 'Лариса', 'Виктор', 'Илья', 'Мария'],
    MAX_LENGTH: '140'
  };
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
  window.data = {
    getPhotosArr: function (arrLength) {
      var photos = [];
      for (var i = 1; i < arrLength + 1; i++) {
        photos.push(getPhotoItem(i));
      }
      return photos;
    },
    COMMENTS: commentsParams
  };
})();
