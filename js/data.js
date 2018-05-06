'use strict';

(function () {
  var ADDS_COUNT = 5;
  var fillMassAdds = function () {
    var offers = [];
    /* for (var i = 0; i < ADDS_COUNT; i++) {
      offers[i] = {
        author: '',
        offer: {
          title: '',
          address: '',
          price: '',
          type: '',
          rooms: '',
          guests: '',
          checkin: '',
          checkout: '',
          features: '',
          description: '',
          photos: ''
        },
        location: {
          x: '',
          y: ''
        }
      };
    } */
    offers.forEach(function (el, i) {
      offers[i] = {
        author: '',
        offer: {
          title: '',
          address: '',
          price: '',
          type: '',
          rooms: '',
          guests: '',
          checkin: '',
          checkout: '',
          features: '',
          description: '',
          photos: ''
        },
        location: {
          x: '',
          y: ''
        }
      };
    });
    return offers;
  };

  window.data = {
    MAP_PIN_WIDTH: 40,
    MAP_PIN_HEIGHT: 40,
    typeChoice: {
      flat: 'Квартира',
      palace: 'Дворец',
      house: 'Дом',
      bungalo: 'Бунгало'
    },
    massAdds: fillMassAdds()
  };
})();
