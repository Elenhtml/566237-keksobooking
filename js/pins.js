'use strict';

(function () {
  var MAP_PIN_MAIN_COORDINATES = {
    LEFT: 570,
    TOP: 375,
    HEIGHT: 40,
    CORNER: 22
  };
  var DEBOUNCE_INTERVAL = 500;
  var DEFAULT_OFFERS = 5;
  var mapShow = document.querySelector('.map');
  var mainPin = mapShow.querySelector('.map__pin--main');
  var fieldsets = document.querySelectorAll('.ad-form fieldset');
  var adFormAddress = document.querySelector('#address');
  var formFilters = mapShow.querySelector('.map__filters');
  var addressesNew = [];
  var similarListElement = document.querySelector('.map__pins');
  var similarMapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');

  var createMapPin = function (mapPin) {
    var mapPinElement = similarMapPinTemplate.cloneNode(true);
    mapPinElement.style = 'left: ' + (mapPin.location.x - window.data.MAP_PIN_WIDTH / 2) + 'px;' + 'top: ' + (mapPin.location.y - window.data.MAP_PIN_HEIGHT) + 'px;';
    mapPinElement.querySelector('img').src = mapPin.author.avatar;
    mapPinElement.querySelector('img').alt = mapPin.offer.title;

    mapPinElement.addEventListener('click', function () {
      window.card.closePopup();
      window.card.createAdvert(mapPin);
    });

    return mapPinElement;
  };

  var fragment = document.createDocumentFragment();
  var setAllElements = function (arr) {
    arr.forEach(function (it) {
      fragment.appendChild(createMapPin(it));
    });
    return fragment;
  };

  adFormAddress.value = MAP_PIN_MAIN_COORDINATES.LEFT + ', ' + MAP_PIN_MAIN_COORDINATES.TOP;

  var onError = function (message) {
    var showMessage = document.createElement('div');
    showMessage.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    showMessage.style.position = 'absolute';
    showMessage.style.left = 0;
    showMessage.style.right = 0;
    showMessage.style.fontSize = '30px';
    showMessage.textContent = message;
    document.body.insertAdjacentElement('afterbegin', showMessage);
    setTimeout(function () {
      showMessage.parentNode.removeChild(showMessage);
    }, 3000);
  };
  var setDefaultAddress = function () {
    adFormAddress.value = MAP_PIN_MAIN_COORDINATES.LEFT + ', ' + MAP_PIN_MAIN_COORDINATES.TOP;
  };
  var setAddress = function () {
    adFormAddress.value = (MAP_PIN_MAIN_COORDINATES.LEFT + window.data.MAP_PIN_WIDTH / 2) + ', ' + (MAP_PIN_MAIN_COORDINATES.TOP + MAP_PIN_MAIN_COORDINATES.HEIGHT + MAP_PIN_MAIN_COORDINATES.CORNER);
  };
  mainPin.addEventListener('mouseup', function () {
    mapShow.classList.remove('map--faded');
    window.form.adForm.classList.remove('ad-form--disabled');

    fieldsets.forEach(function (elem) {
      elem.removeAttribute('disabled');
    });

    setAddress();

    window.backend.loadData(function (res) {
      addressesNew = res.slice(DEFAULT_OFFERS);
      similarListElement.appendChild(setAllElements(addressesNew));
    }, onError);
  });
  var mapCoords = {
    WIDTH: 1170,
    HEIGHT: 704
  };

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var checkPinCoords = function (x, y) {
      if (x < 0) {
        x = 0;
      } else if (x > mapCoords.WIDTH) {
        x = mapCoords.WIDTH - window.data.MAP_PIN_WIDTH;
      }

      if (y < 0) {
        y = 0;
      } else if (y > mapCoords.HEIGHT) {
        y = mapCoords.HEIGHT - window.data.MAP_PIN_HEIGHT * 2.5;
      }

      mainPin.style.top = y + 'px';
      mainPin.style.left = x + 'px';

      adFormAddress.value = (x + window.data.MAP_PIN_WIDTH / 2) + ', ' + (y + MAP_PIN_MAIN_COORDINATES.HEIGHT + MAP_PIN_MAIN_COORDINATES.CORNER);
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      checkPinCoords((mainPin.offsetLeft - shift.x), (mainPin.offsetTop - shift.y));
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      var shift = {
        x: startCoords.x - upEvt.clientX,
        y: startCoords.y - upEvt.clientY
      };
      startCoords = {
        x: upEvt.clientX,
        y: upEvt.clientY
      };
      checkPinCoords((mainPin.offsetLeft - shift.x), (mainPin.offsetTop - shift.y));

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  var debounce = function (fun) {
    var lastTimeout = null;
    return function () {
      if (lastTimeout) {
        clearTimeout(lastTimeout);
      }
      lastTimeout = setTimeout(fun, DEBOUNCE_INTERVAL);
    };
  };

  var pinsContainer = mapShow.querySelector('.map__pins');

  var removePins = function () {
    var pins = pinsContainer.querySelectorAll('.map__pin:not(.map__pin--main)');
    if (pins !== null) {
      [].forEach.call(pins, function (pin) {
        pinsContainer.removeChild(pin);
      });
    }
  };

  formFilters.addEventListener('change', function () {
    removePins();
    window.card.closePopup();

    debounce(window.filters.upDatePins(addressesNew), 500);

  });

  window.pins = {
    MAP_PIN_MAIN_COORDINATES: MAP_PIN_MAIN_COORDINATES,
    mapShow: mapShow,
    mainPin: mainPin,
    fieldsets: fieldsets,
    setDefaultAddress: setDefaultAddress,
    similarListElement: similarListElement,
    setAllElements: setAllElements,
    formFilters: formFilters,
    removePins: removePins
  };
})();
