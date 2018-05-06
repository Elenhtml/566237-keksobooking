'use strict';

(function () {
  var PRICES_TO_COMPARE = {
    low: 10000,
    high: 50000
  };
  var formFilters = document.querySelector('.map__filters');
  var upDatePins = function (offers) {
    var chosenOffers = offers.slice();
    var selectFilters = formFilters.querySelectorAll('select');
    var featuresFilters = formFilters.querySelectorAll('input[type=checkbox]:checked');
    var FilterRules = {
      'living-type': 'type',
      'living-rooms': 'room',
      'living-guests': 'guests'
    };
    var filterByValue = function (elem, property) {
      return chosenOffers.filter(function (offerData) {
        return offerData.offer[property].toString() === elem.value;
      });
    };
    var filterByPrice = function (priceFilter) {
      return chosenOffers.filter(function (offerData) {
        var priceFilterValues = {
          'middle': offerData.offer.price >= PRICES_TO_COMPARE.low && offerData.offer.price < PRICES_TO_COMPARE.high,
          'low': offerData.offer.price < PRICES_TO_COMPARE.low,
          'high': offerData.offer.price >= PRICES_TO_COMPARE.high
        };
        return priceFilterValues[priceFilter.value];
      });
    };
    var filterByFeatures = function (item) {
      return chosenOffers.filter(function (offerData) {
        return offerData.offer.features.indexOf(item.value) >= 0;
      });
    };
    if (selectFilters.length !== null) {
      selectFilters.forEach(function (item) {
        if (item.value !== 'any') {
          if (item.id !== 'housing-price') {
            chosenOffers = filterByValue(item, FilterRules[item.id]);
          } else {
            chosenOffers = filterByPrice(item);
          }
        }
      });
    }
    if (featuresFilters !== null) {
      featuresFilters.forEach(function (item) {
        chosenOffers = filterByFeatures(item);
      });
    }
    if (chosenOffers.length) {
      window.pins.setAllElements(chosenOffers);
      window.pins.similarListElement.appendChild(window.pins.setAllElements(chosenOffers));
    }
  };
  var pinsContainer = window.pins.mapShow.querySelector('.map__pins');
  var removePins = function () {
    var pins = pinsContainer.querySelectorAll('.map__pin:not(.map__pin--main)');
    if (pins !== null) {
      [].forEach.call(pins, function (pin) {
        pinsContainer.removeChild(pin);
      });
    }
  };
  var debounce = function (fun, DEBOUNCE_INTERVAL) {
    var lastTimeout = null;
    return function () {
      if (lastTimeout) {
        clearTimeout(lastTimeout);
      }
      lastTimeout = setTimeout(fun, DEBOUNCE_INTERVAL);
    };
  };
  /* var onError = function (message) {
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
  }; */
  formFilters.addEventListener('change', function () {
    removePins();
    window.card.closePopup();
    // debounce(upDatePins(window.pins.setAllElements(window.pins.addressesNew)), 500);
    // console.log(upDatePins(window.pins.setAllElements(window.pins.addressesNew)));
    /* window.backend.loadData(function (res) {
      window.pins.addressesNew = res.slice(5);
      window.pins.similarListElement.appendChild(window.pins.setAllElements(window.pins.addressesNew));
    }, onError); */
    debounce(upDatePins(window.pins.addressesNew), 500);
    // debounce(upDatePins(window.pins.similarListElement.appendChild(window.pins.setAllElements(window.pins.addressesNew)), 500));
    // console.log(upDatePins(window.pins.similarListElement.appendChild(window.pins.setAllElements(window.pins.addressesNew))));
  });
  window.filters = {
    upDatePins: function (offers) {
      upDatePins(offers);
    },
    removePins: removePins
  };
})();
