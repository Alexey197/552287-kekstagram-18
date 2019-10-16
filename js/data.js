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
    NAMES: ['Артем', 'Иван', 'Лариса', 'Виктор', 'Илья', 'Мария']
  };

  var getCommentsItem = function () {
    return {
      avatar: 'img/avatar-' + window.util.getRandomNumber(avatarQuantity.MIN_NUMBER, avatarQuantity.MAX_NUMBER) + '.svg',
      message: window.util.getRandomArrElement(commentsParams.SENTENCES),
      name: window.util.getRandomArrElement(commentsParams.NAMES)
    };
  };

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
      likes: window.util.getRandomNumber(urlParams.MIN_LIKE_NUMBER, urlParams.MAX_LIKE_NUMBER),
      comments: getCommentsArr(window.util.getRandomNumber(commentsQuantity.MIN_NUMBER, commentsQuantity.MAX_NUMBER))
    };
  };
  window.data = {
    getPhotosArr: function (arrLength) {
      var photos = [];
      for (var i = 1; i < arrLength + 1; i++) {
        photos.push(getPhotoItem(i));
      }
      return photos;
    }
  };
})();
