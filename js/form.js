'use strict';

(function () {
  var MIN_PRICE_FOR_NIGHT = {
    flat: '1000',
    palace: '10000',
    house: '5000',
    bungalo: '0'
  };
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

  var titleForm = adForm.querySelector('#title');
  adForm.addEventListener('submit', function (evt) {
    if (!titleForm.value) {
      evt.preventDefault();
      titleForm.setCustomValidity('Заполните обязательное поле');
    } else {
      titleForm.setCustomValidity('');
    }
    if (!inputPrice.value) {
      evt.preventDefault();
      inputPrice.setCustomValidity('Заполните обязательное поле');
    } else {
      inputPrice.setCustomValidity('');
      /* window.sendInfoToServer(new FormData(form), function (response) {
        window.pins.mapShow.classList.add('map--faded');
        window.form.adForm.classList.add('ad-form--disabled');
        for (var i = 0; i < window.pins.fieldsets.length; i++) {
          window.pins.fieldsets[i].setAttribute('disabled', 'disabled'); */
        }
      });
     /* window.pins.mainPin.style.top = y + 'px';
      window.pins.mainPin.style.left = x + 'px';
      window.pins.adFormAddress.value = (x + window.data.MAP_PIN_WIDTH / 2) + ', ' + (y + MAP_PIN_MAIN_COORDINATES.HEIGHT + MAP_PIN_MAIN_COORDINATES.CORNER);
      evt.preventDefault(); */
    }
  });
  window.form = {
    adForm: adForm
  };
})();
