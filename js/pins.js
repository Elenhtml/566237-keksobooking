'use strict';

(function () {
  var mapShow = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var fieldsets = document.querySelectorAll('.ad-form fieldset');
  var adFormAddress = document.querySelector('#address');
  var MAP_PIN_MAIN_COORDINATES = {
    LEFT: 570,
    TOP: 375,
    HEIGHT: 40,
    CORNER: 22
  };
  var DEFAULT_OFFERS = 5;
  var adressesNew = [];
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
    for (var i = 0; i < arr.length; i++) {
      fragment.appendChild(createMapPin(arr[i]));
    }
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
    for (var i = 0; i < fieldsets.length; i++) {
      fieldsets[i].removeAttribute('disabled');
    }

    setAddress();

    window.backend.loadData(function (res) {
      adressesNew = res.slice(DEFAULT_OFFERS);
      similarListElement.appendChild(setAllElements(adressesNew));
    }, onError);
  });

  var MapCoords = {
    WIDTH: 1100,
    HEIGHT: 600
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
      } else if (x > MapCoords.WIDTH) {
        x = MapCoords.WIDTH;
      }

      if (y < 0) {
        y = 0;
      } else if (y > MapCoords.HEIGHT) {
        y = MapCoords.HEIGHT;
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

  window.pins = {
    MAP_PIN_MAIN_COORDINATES: MAP_PIN_MAIN_COORDINATES,
    mapShow: mapShow,
    mainPin: mainPin,
    fieldsets: fieldsets,
    setDefaultAddress: setDefaultAddress,
    adFormAddress: adFormAddress
  };
})();
