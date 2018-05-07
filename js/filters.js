'use strict';

(function () {
  var PRICES_TO_COMPARE = {
    low: 10000,
    high: 50000
  };
  var formFilters = window.pins.formFilters;

  var upDatePins = function (offers) {
    var chosenOffers = offers.slice();

    var selectFilters = formFilters.querySelectorAll('select');
    var featuresFilters = formFilters.querySelectorAll('input[type=checkbox]:checked');

    var filterRules = {
      'housing-type': 'type',
      'housing-rooms': 'rooms',
      'housing-guests': 'guests'
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
            chosenOffers = filterByValue(item, filterRules[item.id]);
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

  window.filters = {
    upDatePins: upDatePins,
    formFilters: formFilters
  };
})();
