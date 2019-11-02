'use strict';

(function () {
  var filtersButtonPopular = document.querySelector('#filter-popular');
  var filterButtonRandom = document.querySelector('#filter-random');
  var filterButtonDiscussed = document.querySelector('#filter-discussed');
  var filters = document.querySelector('.img-filters');
  var pictures = [];

  filtersButtonPopular.addEventListener('click', function () {
    window.filter.popularClickHandler(pictures);
  });
  filterButtonRandom.addEventListener('click', function () {
    window.filter.randomClickHandler(pictures);
  });
  filterButtonDiscussed.addEventListener('click', function () {
    window.filter.discussedClickHandler(pictures);
  });
  var onLoad = function (data) {
    pictures = data.slice();
    window.gallery.update(data);
    filters.classList.remove('img-filters--inactive');
  };
  window.backend.load(onLoad, window.messages.getError);
})();
