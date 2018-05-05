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
  formFilters.addEventListener('change', function () {
    removePins();
    window.card.closePopup();
    debounce(upDatePins(window.pins.addressesNew), 500);
  });
  window.filters = {
    upDatePins: function (offers) {
      upDatePins(offers);
    },
    removePins: removePins
  };
})();
