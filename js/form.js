'use strict';

(function () {
  var MIN_PRICE_FOR_NIGHT = {
    flat: '1000',
    palace: '10000',
    house: '5000',
    bungalo: '0'
  };
  var typeOfLiving = window.pins['adForm'].querySelector('#type');
  var inputPrice = window.pins.adForm.querySelector('#price');
  var changeTypeSelection = function () {
    var minPrice = MIN_PRICE_FOR_NIGHT[typeOfLiving.value];
    inputPrice.setAttribute('min', minPrice);
    inputPrice.setAttribute('placeholder', minPrice);
  };
  typeOfLiving.addEventListener('change', changeTypeSelection);

  var timesIn = window.pins.adForm.querySelector('#timein');
  var timesOut = window.pins.adForm.querySelector('#timeout');
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
  var roomNumber = window.pins.adForm.querySelector('#room_number');
  var guestsCapacity = window.pins.adForm.querySelector('#capacity');
  var chooseRoomAndCapacity = function () {
    if (guestsCapacity.options.length > 0) {
      [].forEach.call(guestsCapacity.options, function (option) {
        option.selected = (ROOM_CAPACITY[roomNumber.value][0] === option.value) ? true : false;
        option.hidden = (ROOM_CAPACITY[roomNumber.value].indexOf(option.value) >= 0) ? false : true;
      });
    }
  };
  roomNumber.addEventListener('change', chooseRoomAndCapacity);

  var titleForm = window.pins.adForm.querySelector('#title');
  window.pins.adForm.addEventListener('submit', function (evt) {
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
    }
  });
})();
