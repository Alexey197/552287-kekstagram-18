'use strict';
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var PinHandleParam = {
    MIN_VALUE: 0,
    MAX_VALUE: 100,
    ABSOLUTE_MAX_VALUE: 455,
    RELATIVE_VALUE: '%'
  };

  var errorCodesText = {
    'hashtags_unique': 'Один и тот же хэш-тег не может быть использован дважды.',
    'hashtags_amount': 'Нельзя указать больше пяти хэш-тегов.',
    'hashtag_length': 'Максимальная длина одного хэш-тега 20 символов, включая решётку.',
    'hashtag_diez': 'Хеш-тег не может состоять только из одной решётки.',
    'hashtag_start_dies': 'Хэш-тег начинается с символа # (решётка).'
  };

  var FilterParam = {
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

  var ScaleParam = {
    MAX_VALUE: 100,
    MIN_VALUE: 25,
    STEP: 25,
    SCALE_UNIT: '%'
  };

  var imageUploadForm = document.querySelector('.img-upload__form');
  var imageUploadPreview = imageUploadForm.querySelector('.img-upload__preview img');
  var effectsPreview = imageUploadForm.querySelectorAll('.effects__preview');
  var imageUpLoadInput = imageUploadForm.querySelector('.img-upload__input');
  var imageUploadOverlay = imageUploadForm.querySelector('.img-upload__overlay');
  var pinHandle = imageUploadForm.querySelector('.effect-level__pin');
  var effectsItems = imageUploadForm.querySelectorAll('.effects__radio');
  var effects = imageUploadForm.querySelector('.effects');
  var effectLevelDepth = imageUploadForm.querySelector('.effect-level__depth');
  var effectSlider = imageUploadForm.querySelector('.effect-level');
  var closeFormButton = imageUploadForm.querySelector('.img-upload__cancel');
  var textHashtags = imageUploadForm.querySelector('.text__hashtags');
  var textDescription = imageUploadForm.querySelector('.text__description');
  var scaleSmaller = imageUploadForm.querySelector('.scale__control--smaller');
  var scaleBigger = imageUploadForm.querySelector('.scale__control--bigger');
  var scaleValue = imageUploadForm.querySelector('.scale__control--value');

  var addImage = function () {
    var file = imageUploadForm.filename.files[0];
    var fileName = file.name.toLowerCase();

    if (!file) {
      return;
    }

    var matches = FILE_TYPES.some(function (item) {
      return fileName.endsWith(item);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        imageUploadPreview.src = reader.result;

        effectsPreview.forEach(function (image) {
          image.style.backgroundImage = 'url(' + reader.result + ')';
        });
      });

      reader.readAsDataURL(file);
    }
  };

  var pinMouseMoveHandler = function (evt) {
    var startPinPosition = parseFloat(pinHandle.style.left);
    var startCoordinate = evt.clientX;

    var mouseMoveHandler = function (moveEvt) {
      var shift = moveEvt.clientX - startCoordinate;
      var currentPinPosition = startPinPosition + shift / PinHandleParam.ABSOLUTE_MAX_VALUE * PinHandleParam.MAX_VALUE;

      if (currentPinPosition < PinHandleParam.MIN_VALUE) {
        currentPinPosition = PinHandleParam.MIN_VALUE;
      } else if (currentPinPosition > PinHandleParam.MAX_VALUE) {
        currentPinPosition = PinHandleParam.MAX_VALUE;
      }
      pinHandle.style.left = currentPinPosition + '%';
      effectLevelDepth.style.width = currentPinPosition + '%';
      var effectPinValue = Math.round(currentPinPosition);
      var changePinHandleObj = {
        'chrome': 'grayscale(' + effectPinValue / PinHandleParam.MAX_VALUE + ')',
        'sepia': 'sepia(' + effectPinValue / PinHandleParam.MAX_VALUE + ')',
        'marvin': 'invert(' + effectPinValue + FilterParam.MARVIN.FILTER_UNIT + ')',
        'phobos': 'blur(' + effectPinValue / PinHandleParam.MAX_VALUE * (FilterParam.PHOBOS.MAX_VALUE - FilterParam.PHOBOS.MIN_VALUE) + FilterParam.PHOBOS.FILTER_UNIT + ')',
        'heat': 'brightness(' + (effectPinValue / PinHandleParam.MAX_VALUE * (FilterParam.HEAT.MAX_VALUE - FilterParam.HEAT.MIN_VALUE) + FilterParam.HEAT.MIN_VALUE) + ')'
      };
      var inputValue = imageUploadForm.effect.value;
      imageUploadPreview.style.filter = changePinHandleObj[inputValue];
    };

    var mouseUpHandler = function () {
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  };

  var changeEffectsObj = {
    'chrome': FilterParam.CHROME.CLASS_NAME,
    'sepia': FilterParam.SEPIA.CLASS_NAME,
    'marvin': FilterParam.MARVIN.CLASS_NAME,
    'phobos': FilterParam.PHOBOS.CLASS_NAME,
    'heat': FilterParam.HEAT.CLASS_NAME
  };

  var changeEffects = function () {
    var inputValue = imageUploadForm.effect.value;
    imageUploadPreview.classList.add(changeEffectsObj[inputValue]);
    if (inputValue !== 'none') {
      effectSlider.classList.remove('hidden');
    }
  };

  var resetPictureStyle = function () {
    effectSlider.classList.add('hidden');
    imageUploadPreview.removeAttribute('class');
    imageUploadPreview.removeAttribute('style');
  };

  var effectsChangeHandler = function () {
    resetPictureStyle();
    changeEffects();
  };

  var effectsItemsSwitch = function () {
    pinHandle.style.left = PinHandleParam.MAX_VALUE + PinHandleParam.RELATIVE_VALUE;
    effectLevelDepth.style.width = PinHandleParam.MAX_VALUE + PinHandleParam.RELATIVE_VALUE;
  };

  var effectsItemsSwitchHandler = function () {
    effectsItemsSwitch();
  };

  var setScaleValue = function (value) {
    imageUploadPreview.style.transform = ('scale(' + value / 100 + ')');
    scaleValue.value = value + ScaleParam.SCALE_UNIT;
  };

  var scaleDecrease = function () {
    var scaleValueNumber = parseInt(scaleValue.value, 10);
    if (scaleValueNumber > ScaleParam.MIN_VALUE) {
      scaleValueNumber -= ScaleParam.STEP;
    }
    setScaleValue(scaleValueNumber);
  };

  var scaleDecreaseClickHandler = function () {
    scaleDecrease();
  };

  var scaleIncrease = function () {
    var scaleValueNumber = parseInt(scaleValue.value, 10);
    if (scaleValueNumber < ScaleParam.MAX_VALUE) {
      scaleValueNumber += ScaleParam.STEP;
    }
    setScaleValue(scaleValueNumber);
  };

  var scaleIncreaseClickHandler = function () {
    scaleIncrease();
  };

  var formSuccessHandler = function () {
    window.messages.getSuccess();
    closeForm();
  };
  var formErrorHandler = function (errorMessage) {
    window.messages.getError(errorMessage);
    closeForm();
  };

  var documentEscPressHandler = function (evt) {
    window.util.isEscEvent(evt, closeForm);
  };

  var inputHashtagBlurHandler = function () {
    document.addEventListener('keydown', documentEscPressHandler);
  };

  var inputHashtagFocusHandler = function () {
    document.removeEventListener('keydown', documentEscPressHandler);
  };

  var textareaDescriptionFocusHandler = function () {
    document.removeEventListener('keydown', documentEscPressHandler);
  };

  var textareaDescriptionBlurHandler = function () {
    document.addEventListener('keydown', documentEscPressHandler);
  };

  var formSubmitHandler = function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(imageUploadForm), formSuccessHandler, formErrorHandler);
    changeEffects();
  };

  var buttonClickCloseFormHandler = function () {
    closeForm();
  };

  var formOpen = function () {
    imageUploadOverlay.classList.remove('hidden');
    pinHandle.addEventListener('mousedown', pinMouseMoveHandler);
    textHashtags.addEventListener('blur', hashtagsValidationBlurHandler);
    textHashtags.addEventListener('focus', inputHashtagFocusHandler);
    textHashtags.addEventListener('blur', inputHashtagBlurHandler);
    textDescription.addEventListener('blur', textValidationBlurHandler);
    textDescription.addEventListener('focus', textareaDescriptionFocusHandler);
    textDescription.addEventListener('blur', textareaDescriptionBlurHandler);
    imageUploadForm.addEventListener('invalid', function (evt) {
      evt.target.classList.add('red');
    }, true);
    document.addEventListener('keydown', documentEscPressHandler);
    effectsItems.forEach(function (item) {
      item.addEventListener('change', effectsItemsSwitchHandler);
    });
    effects.addEventListener('change', effectsChangeHandler);
    pinHandle.addEventListener('mouseup', pinMouseMoveHandler);
    scaleValue.value = ScaleParam.MAX_VALUE + ScaleParam.SCALE_UNIT;
    scaleSmaller.addEventListener('click', scaleDecreaseClickHandler);
    scaleBigger.addEventListener('click', scaleIncreaseClickHandler);
    closeFormButton.addEventListener('click', buttonClickCloseFormHandler);
    imageUploadForm.addEventListener('submit', formSubmitHandler);
    addImage();
  };

  var closeForm = function () {
    imageUploadOverlay.classList.add('hidden');
    pinHandle.removeEventListener('mousedown', pinMouseMoveHandler);
    textHashtags.removeEventListener('change', hashtagsValidationBlurHandler);
    textHashtags.removeEventListener('blur', hashtagsValidationBlurHandler);
    textDescription.removeEventListener('blur', textValidationBlurHandler);
    imageUploadForm.removeEventListener('invalid', function (evt) {
      evt.target.classList.add('red');
    }, true);
    document.removeEventListener('keydown', documentEscPressHandler);
    effectsItems.forEach(function (item) {
      item.removeEventListener('click', effectsItemsSwitchHandler);
    });
    effects.removeEventListener('change', effectsChangeHandler);
    pinHandle.removeEventListener('mouseup', pinMouseMoveHandler);
    scaleValue.value = ScaleParam.MAX_VALUE + ScaleParam.SCALE_UNIT;
    scaleSmaller.removeEventListener('click', scaleDecreaseClickHandler);
    scaleBigger.removeEventListener('click', scaleIncreaseClickHandler);
    imageUploadForm.removeEventListener('submit', formSubmitHandler);
    textHashtags.classList.remove('red');
    // resetPictureStyle();
    imageUploadForm.reset();
  };

  var isUniqueElem = function (item, index, curArr) {
    return curArr.indexOf(item) === index;
  };

  var hashtagsValidate = function () {
    var hashtagArr = textHashtags.value.trim().toLowerCase().split(' ');
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

  var hashtagsValidationBlurHandler = function () {
    hashtagsValidate();
  };

  var textValidate = function () {
    if (textDescription.value.length > 140) {
      textDescription.setCustomValidity('Длина комментария не может составлять больше 140 символов.');
    } else {
      textDescription.setCustomValidity('');
    }
  };

  var textValidationBlurHandler = function () {
    textValidate();
  };

  var formInit = function () {
    imageUpLoadInput.addEventListener('change', function () {
      imageUploadOverlay.classList.remove('hidden');
      effectSlider.classList.add('hidden');
      formOpen();
    });
    imageUploadForm.setAttribute('action', 'https://js.dump.academy/kekstagram');
  };
  formInit();
})();
