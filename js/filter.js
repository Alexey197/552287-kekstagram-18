'use strict';

(function () {
  var PICTURES_AMOUNT = 10;
  var DEBOUNCE_INTERVAL = 500;
  var filtersButtons = document.querySelectorAll('.img-filters__button');
  var filtersButtonActive = 'img-filters__button--active';
  var filterPopularElement = document.getElementById('filter-popular');
  var filterRandomElement = document.getElementById('filter-random');
  var filterDiscussedElement = document.getElementById('filter-discussed');
  var filters = document.querySelector('.img-filters');
  var pictures = [];

  var changeButtonActivity = function (element) {
    filtersButtons.forEach(function (item) {
      item.classList.remove(filtersButtonActive);
    });
    element.classList.add(filtersButtonActive);
  };

  var popularClickHandler = function (elements) {
    changeButtonActivity(filterPopularElement);
    window.gallery.update(elements);
  };

  var randomClickHandler = function (elements) {
    var sourcePictures = elements.slice();
    var randomPictures = [];

    for (var i = 0; randomPictures.length < PICTURES_AMOUNT; i++) {
      var randomIndex = Math.round(Math.random() * (sourcePictures.length - 1));
      var randomElement = sourcePictures[randomIndex];
      randomPictures.push(randomElement);
      sourcePictures.splice(randomIndex, 1);
    }
    changeButtonActivity(filterRandomElement);
    window.gallery.update(randomPictures);
  };

  var discussedClickHandler = function (elements) {
    var discussedPictures = elements.slice();
    discussedPictures.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
    changeButtonActivity(filterDiscussedElement);
    window.gallery.update(discussedPictures);
  };

  filterPopularElement.addEventListener('click', function () {
    window.util.debounce(popularClickHandler(pictures), DEBOUNCE_INTERVAL);
  });
  filterRandomElement.addEventListener('click', function () {
    window.util.debounce(randomClickHandler(pictures), DEBOUNCE_INTERVAL);
  });
  filterDiscussedElement.addEventListener('click', function () {
    window.util.debounce(discussedClickHandler(pictures), DEBOUNCE_INTERVAL);
  });

  var successHandler = function (data) {
    pictures = data.slice();
    window.gallery.update(data);
    filters.classList.remove('img-filters--inactive');
  };
  window.backend.load(successHandler, window.messages.getError);
})();
