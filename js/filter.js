'use strict';

(function () {
  var PICTURES_AMOUNT = 10;
  var DEBOUNCE_INTERVAL = 500;
  var ACTIVE_CLASS = 'img-filters__button--active';
  var filterType = 'filter-popular';
  var buttonForm = document.querySelector('.img-filters__form');
  var activeButton = buttonForm.querySelector('.img-filters__button--active');

  var getPopularFilter = function (elements) {
    return elements;
  };

  var getRandomFilter = function (elements) {
    var sourcePictures = elements.slice();
    var randomPictures = [];

    for (var i = 0; randomPictures.length < PICTURES_AMOUNT; i++) {
      var randomIndex = Math.round(Math.random() * (sourcePictures.length - 1));
      var randomElement = sourcePictures[randomIndex];
      randomPictures.push(randomElement);
      sourcePictures.splice(randomIndex, 1);
    }
    return randomPictures;
  };

  var getDiscussedFilter = function (elements) {
    var discussedPictures = elements.slice();
    discussedPictures.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
    return discussedPictures;
  };

  var filters = {
    'filter-popular': getPopularFilter,
    'filter-random': getRandomFilter,
    'filter-discussed': getDiscussedFilter
  };

  var getFilteredArr = function (arr) {
    var filteredArr = filters[filterType](arr);
    return filteredArr;
  };

  var changeButtonActivity = function (evt) {
    activeButton.classList.remove(ACTIVE_CLASS);
    activeButton = evt.target;
    activeButton.classList.add(ACTIVE_CLASS);
  };

  var filtersButtonClickHandler = function (evt) {
    filterType = evt.target.id;
    changeButtonActivity(evt);
    window.gallery.update();
  };

  buttonForm.addEventListener('click', window.util.debounce(filtersButtonClickHandler, DEBOUNCE_INTERVAL));

  window.filter = getFilteredArr;
})();
