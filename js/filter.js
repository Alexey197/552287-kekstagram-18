'use strict';

(function () {
  var PICTURES_AMOUNT = 10;
  var DEBOUNCE_INTERVAL = 500;
  var filterType = 'filter-popular';
  var buttonForm = document.querySelector('.img-filters__form');
  var filtersButtons = document.querySelectorAll('.img-filters__button');
  var filtersButtonActive = 'img-filters__button--active';
  var filterPopularElement = document.getElementById('filter-popular');
  var filterRandomElement = document.getElementById('filter-random');
  var filterDiscussedElement = document.getElementById('filter-discussed');

  var changeButtonActivity = function (element) {
    filtersButtons.forEach(function (item) {
      item.classList.remove(filtersButtonActive);
    });
    element.classList.add(filtersButtonActive);
  };

  var popularFilter = function (elements) {
    changeButtonActivity(filterPopularElement);
    return elements;
  };

  var randomFilter = function (elements) {
    var sourcePictures = elements.slice();
    var randomPictures = [];

    for (var i = 0; randomPictures.length < PICTURES_AMOUNT; i++) {
      var randomIndex = Math.round(Math.random() * (sourcePictures.length - 1));
      var randomElement = sourcePictures[randomIndex];
      randomPictures.push(randomElement);
      sourcePictures.splice(randomIndex, 1);
    }
    changeButtonActivity(filterRandomElement);
    return randomPictures;
  };

  var discussedFilter = function (elements) {
    var discussedPictures = elements.slice();
    discussedPictures.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
    changeButtonActivity(filterDiscussedElement);
    return discussedPictures;
  };

  var filterObj = {
    'filter-popular': popularFilter,
    'filter-random': randomFilter,
    'filter-discussed': discussedFilter
  };

  var filterMap = function (arr) {
    var filteredArr = filterObj[filterType](arr);
    return filteredArr;
  };

  var filtersButtonClickHandler = function (evt) {
    filterType = evt.target.id;
    window.gallery.update();
  };

  buttonForm.addEventListener('click', window.util.debounce(filtersButtonClickHandler, DEBOUNCE_INTERVAL));

  window.filter = filterMap;
})();
