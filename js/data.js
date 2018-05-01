'use strict';

(function () {
  var ADDS_COUNT = 8;
  var avatars = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'];
  var titlesTypes = {
    titles: ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'],
    types: ['flat', 'flat', 'palace', 'palace', 'house', 'house', 'bungalo', 'bungalo']
  };
  var addresses = ['600, 350', '350, 600', '1000, 700', '1100, 350', '900, 550', '800, 400', '500, 550', '200, 700'];
  var times = ['12:00', '13:00', '14:00'];
  var featuresAll = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  var getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var chooseRandom = function (arr) {
    var choice = arr[Math.floor(Math.random() * arr.length)];
    return choice;
  };

  var massNew = [];
  var chooseFeatures = function (arr) {
    massNew = arr.slice();
    massNew.splice(chooseRandom(massNew), Math.floor(Math.random() * (massNew.length)));
    return massNew;
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
  photosAll: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],  
  massAdds: []
  }
  var fillMassAdds = function () {
    for (var i = 0; i < ADDS_COUNT; i++) {
      window.data.massAdds[i] = {
        author: avatars[i],
        offer: {
          title: titlesTypes.titles[i],
          address: addresses[i],
          price: getRandomInt(1000, 1000000),
          type: titlesTypes.types[i],
          rooms: getRandomInt(1, 5),
          guests: getRandomInt(1, 30),
          checking: chooseRandom(times),
          checkout: chooseRandom(times),
          features: chooseFeatures(featuresAll),
          description: '',
          photos: window.data.photosAll
        },
        location: {
          x: getRandomInt(300, 900),
          y: getRandomInt(150, 500)
        }
      };
    }
    return window.data.massAdds;
  };
  fillMassAdds();
})();
