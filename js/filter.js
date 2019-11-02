'use strict';

(function () {
  var PICTURE_COUNT = 10;
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

  window.filter = {
    popularClickHandler: window.debounce(function (pictures) {
      changeButtonActivity(filterPopularElement);
      window.gallery.update(pictures);
    }),
    randomClickHandler: window.debounce(function (pictures) {
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
    }),
    discussedClickHandler: window.debounce(function (pictures) {
      var discussedPictures = pictures.slice();
      discussedPictures.sort(function (a, b) {
        return b.comments.length - a.comments.length;
      });
      changeButtonActivity(filterDiscussedElement);
      window.gallery.update(discussedPictures);
    })
  };
})();
