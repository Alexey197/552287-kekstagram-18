'use strict';

(function () {
  var PICTURE_COUNT = 10;
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

  var filter = {
    popularClickHandler: window.util.debounce(function () {
      changeButtonActivity(filterPopularElement);
      window.gallery.update(pictures);
    }, DEBOUNCE_INTERVAL),
    randomClickHandler: window.util.debounce(function () {
      var sourcePictures = pictures.slice();
      var randomPictures = [];

      for (var i = 0; randomPictures.length < PICTURE_COUNT; i++) {
        var randomIndex = Math.round(Math.random() * (sourcePictures.length - 1));
        var randomElement = sourcePictures[randomIndex];
        randomPictures.push(randomElement);
        sourcePictures.splice(randomIndex, 1);
      }
      changeButtonActivity(filterRandomElement);
      window.gallery.update(randomPictures);
    }, DEBOUNCE_INTERVAL),
    discussedClickHandler: window.util.debounce(function () {
      var discussedPictures = pictures.slice();
      discussedPictures.sort(function (a, b) {
        return b.comments.length - a.comments.length;
      });
      changeButtonActivity(filterDiscussedElement);
      window.gallery.update(discussedPictures);
    }, DEBOUNCE_INTERVAL)
  };

  filterPopularElement.addEventListener('click', function () {
    filter.popularClickHandler(pictures);
  });
  filterRandomElement.addEventListener('click', function () {
    filter.randomClickHandler(pictures);
  });
  filterDiscussedElement.addEventListener('click', function () {
    filter.discussedClickHandler(pictures);
  });
  var successHandler = function (data) {
    pictures = data.slice();
    window.gallery.update(data);
    filters.classList.remove('img-filters--inactive');
  };
  window.backend.load(successHandler, window.messages.getError);
})();
