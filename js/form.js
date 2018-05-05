'use strict';

(function () {
  var MIN_PRICE_FOR_NIGHT = {
    flat: '1000',
    palace: '10000',
    house: '5000',
    bungalo: '0'
  };
  // var pinsContainer = window.pins.mapShow.querySelector('.map__pins');
  var adForm = document.querySelector('.ad-form');
  var typeOfLiving = adForm.querySelector('#type');
  var inputPrice = adForm.querySelector('#price');
  var changeTypeSelection = function () {
    var minPrice = MIN_PRICE_FOR_NIGHT[typeOfLiving.value];
    inputPrice.setAttribute('min', minPrice);
    inputPrice.setAttribute('placeholder', minPrice);
  };
  typeOfLiving.addEventListener('change', changeTypeSelection);

  var timesIn = adForm.querySelector('#timein');
  var timesOut = adForm.querySelector('#timeout');
  var changeTimeSelection = function (pointIn, pointOut) {
    pointOut.value = pointIn.value;
  };
  timesIn.addEventListener('change', function () {
    changeTimeSelection(timesIn, timesOut);
  });
  timesOut.addEventListener('change', function () {
    changeTimeSelection(timesOut, timesIn);
  });

  var ROOM_CAPACITY = {
    1: ['1'],
    2: ['2', '1'],
    3: ['3', '2', '1'],
    100: ['0']
  };
  var roomNumber = adForm.querySelector('#room_number');
  var guestsCapacity = adForm.querySelector('#capacity');
  var chooseRoomAndCapacity = function () {
    if (guestsCapacity.options.length > 0) {
      [].forEach.call(guestsCapacity.options, function (option) {
        option.selected = (ROOM_CAPACITY[roomNumber.value][0] === option.value) ? true : false;
        option.hidden = (ROOM_CAPACITY[roomNumber.value].indexOf(option.value) >= 0) ? false : true;
      });
    }
  };
  roomNumber.addEventListener('change', chooseRoomAndCapacity);

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
  /* var removePins = function () {
    var pins = pinsContainer.querySelectorAll('.map__pin:not(.map__pin--main)');
    if (pins !== null) {
      [].forEach.call(pins, function (pin) {
        pinsContainer.removeChild(pin);
      });
    }
  }; */ 
  
  var makeReset = function () {
    window.pins.mapShow.classList.add('map--faded');
    window.form.adForm.classList.add('ad-form--disabled');
    for (var i = 0; i < window.pins.fieldsets.length; i++) {
      window.pins.fieldsets[i].disabled = true;
    }
    adForm.reset();
    window.card.closePopup();
    window.filters.removePins();
    window.pins.mainPin.style.top = window.pins.MAP_PIN_MAIN_COORDINATES.TOP + 'px';
    window.pins.mainPin.style.left = window.pins.MAP_PIN_MAIN_COORDINATES.LEFT + 'px';
    window.pins.setDefaultAddress();
  };
  var onSuccess = function () {
    makeReset();

    var successField = document.querySelector('.success');
    successField.classList.remove('hidden');
    setTimeout(function () {
      successField.classList.add('hidden');
    }, 3000);
  };
  var titleForm = adForm.querySelector('#title');
  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    if (!titleForm.value) {
      titleForm.setCustomValidity('Заполните обязательное поле');
    } else {
      titleForm.setCustomValidity('');
    }
    if (!inputPrice.value) {
      inputPrice.setCustomValidity('Заполните обязательное поле');
    } else {
      inputPrice.setCustomValidity('');
      window.backend.uploadData(new FormData(adForm), onSuccess, onError);
    }
  });
  var buttonReset = document.querySelector('.ad-form__reset');
  buttonReset.addEventListener('click', function () {
    makeReset();
  });
  window.form = {
    adForm: adForm
  };
})();
