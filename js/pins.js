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

  var similarListElement = document.querySelector('.map__pins');
  var similarMapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');
  window.pins = {
    adForm: document.querySelector('.ad-form'),
    closePopup: function () {
      var popup = mapShow.querySelector('.popup');
      if (popup !== null) {
        mapShow.removeChild(popup);
      }
    }
  };

  var createMapPin = function (mapPin) {
    var mapPinElement = similarMapPinTemplate.cloneNode(true);
    mapPinElement.style = 'left: ' + (mapPin.location.x - window.data.MAP_PIN_WIDTH / 2) + 'px;' + 'top: ' + (mapPin.location.y - window.data.MAP_PIN_HEIGHT) + 'px;';
    mapPinElement.querySelector('img').src = mapPin.author;
    mapPinElement.querySelector('img').alt = mapPin.title;

    mapPinElement.addEventListener('click', function () {
      window.pins.closePopup();
      window.createAdvert(mapPin);
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

  mainPin.addEventListener('mouseup', function () {
    mapShow.classList.remove('map--faded');
    window.pins.adForm.classList.remove('ad-form--disabled');
    for (var i = 0; i < fieldsets.length; i++) {
      fieldsets[i].removeAttribute('disabled');
    }
    adFormAddress.value = (MAP_PIN_MAIN_COORDINATES.LEFT + window.MAP_PIN_WIDTH / 2) + ', ' + (MAP_PIN_MAIN_COORDINATES.TOP + MAP_PIN_MAIN_COORDINATES.HEIGHT + MAP_PIN_MAIN_COORDINATES.CORNER);

    setAllElements(window.data.massAdds);
    similarListElement.appendChild(fragment);
  });

  var MAP_WIDTH = 1170;
  var MAP_HEIGHT = 704;
  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
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
      /* window.makeBorderForMainPin = function () {
        var newX = (mainPin.offsetLeft - shift.x);
        if (newX < 0) {
          newX = 0;
        } else if (newX > MAP_WIDTH) {
          newX = MAP_WIDTH - window.data.MAP_PIN_WIDTH;
        }
        mainPin.style.left = newX + 'px';
        var newY = (mainPin.offsetTop - shift.y);
        if (newY < 0) {
          newY = 0;
        } else if (newY > MAP_HEIGHT) {
          newY = MAP_HEIGHT - MAP_PIN_MAIN_COORDINATES.HEIGHT - MAP_PIN_MAIN_COORDINATES.CORNER * 2;
        }
        mainPin.style.top = newY + 'px';
        return adFormAddress.value = (newX + window.data.MAP_PIN_WIDTH / 2) + ', ' + (newY + MAP_PIN_MAIN_COORDINATES.HEIGHT + MAP_PIN_MAIN_COORDINATES.CORNER);
      };
      window.makeBorderForMainPin(); */
      var newX = (mainPin.offsetLeft - shift.x);
      if (newX < 0) {
        newX = 0;
      } else if (newX > MAP_WIDTH) {
        newX = MAP_WIDTH - window.data.MAP_PIN_WIDTH;
      }
      mainPin.style.left = newX + 'px';
      var newY = (mainPin.offsetTop - shift.y);
      if (newY < 0) {
        newY = 0;
      } else if (newY > MAP_HEIGHT) {
        newY = MAP_HEIGHT - MAP_PIN_MAIN_COORDINATES.HEIGHT - MAP_PIN_MAIN_COORDINATES.CORNER * 2;
      }
      mainPin.style.top = newY + 'px';
      adFormAddress.value = (newX + window.data.MAP_PIN_WIDTH / 2) + ', ' + (newY + MAP_PIN_MAIN_COORDINATES.HEIGHT + MAP_PIN_MAIN_COORDINATES.CORNER);
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      var shift = {
        x: startCoords.x - upEvt.clientX,
        y: startCoords.y - upEvt.clientY
      };
      startCoords = {
        x: upEvt.clientX,
        y: upEvt.clientY
      };
      /* window.makeBorderForMainPin(); */
      var newX = (mainPin.offsetLeft - shift.x);
      if (newX < 0) {
        newX = 0;
      } else if (newX > MAP_WIDTH) {
        newX = MAP_WIDTH - window.data.MAP_PIN_WIDTH;
      }
      mainPin.style.left = newX + 'px';
      var newY = (mainPin.offsetTop - shift.y);
      if (newY < 0) {
        newY = 0;
      } else if (newY > MAP_HEIGHT) {
        newY = MAP_HEIGHT - MAP_PIN_MAIN_COORDINATES.HEIGHT - MAP_PIN_MAIN_COORDINATES.CORNER * 2;
      }
      mainPin.style.top = newY + 'px';
      adFormAddress.value = (newX + window.data.MAP_PIN_WIDTH / 2) + ', ' + (newY + MAP_PIN_MAIN_COORDINATES.HEIGHT + MAP_PIN_MAIN_COORDINATES.CORNER);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
