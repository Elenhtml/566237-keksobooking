'use strict';

var ADDS_COUNT = 8;
var MAP_PIN_WIDTH = 40;
var MAP_PIN_HEIGHT = 40;
var avatars = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'];
var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var addresses = ['600, 350', '350, 600', '1000, 700', '1100, 350', '900, 550', '800, 400', '500, 550', '200, 700'];
var types = ['flat', 'palace', 'house', 'bungalo'];
var typeChoice = {
  flat: 'Квартира',
  palace: 'Дворец',
  house: 'Дом',
  bungalo: 'Бунгало'
};
var times = ['12:00', '13:00', '14:00'];
var featuresAll = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photosAll = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var chooseRandom = function (arr) {
  var choice = arr[Math.floor(Math.random() * arr.length)];
  return choice;
};

var chooseRandomFeatures = function (arr) {
  var choice = arr[Math.floor(Math.random() * (arr.length - 1))];
  return choice;
};

var massNew = [];
var chooseFeatures = function (arr) {
  massNew = arr.slice();
  massNew.splice(chooseRandomFeatures(massNew), 1);
  return massNew;
};

/*var chooseType = function (arr, offer, title) {
  for (var i = 0; i < ADDS_COUNT; i++) {
    if (arr[i]['offer']['title'] === titles[0] || arr[i]['offer']['title'] === titles[1]) {
      return types[0];
    }
    if (arr[i]['offer']['title'] === titles[2] || arr[i]['offer']['title'] === titles[3]) {
      return types[1];
    }
    if (arr[i]['offer']['title'] === titles[4] || arr[i]['offer']['title'] === titles[5]) {
      return types[2];
    }
    if (arr[i]['offer']['title'] === titles[6] || arr[i]['offer']['title'] === titles[7]) {
      return types[3];
    }
  }
};*/

var massAdds = [];
var fillMassAdds = function () {
  for (var i = 0; i < ADDS_COUNT; i++) {
    massAdds[i] = {
      author: avatars[i],
      offer: {
        title: titles[i],
        address: addresses[i],
        price: getRandomInt(1000, 1000000),
        type: /*chooseType(massAdds, offer, title),*/chooseRandom(types),
        rooms: getRandomInt(1, 5),
        guests: getRandomInt(1, 30),
        checking: chooseRandom(times),
        checkout: chooseRandom(times),
        features: chooseFeatures(featuresAll),
        description: '',
        photos: photosAll
      },
      location: {
        'x': getRandomInt(300, 900),
        y: getRandomInt(150, 500)
      }
    };
  }
  return massAdds;
};
fillMassAdds();

var mapShow = document.querySelector('.map');
mapShow.classList.remove('map--faded');

var similarListElement = document.querySelector('.map__pins');
var similarMapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');

var createMapPin = function (mapPin) {
  var mapPinElement = similarMapPinTemplate.cloneNode(true);
  //mapPinElement.querySelector('.map__pin').style = 'left: ' + (massAdds.location.x - MAP_PIN_WIDTH / 2) + 'px;' + 'top: ' + (massAdds.location.y - MAP_PIN_HEIGHT) + 'px;';
  mapPinElement.querySelector('img').src = mapPin.author;
  mapPinElement.querySelector('img').alt = mapPin.title;
  return mapPinElement;
};

var fragment = document.createDocumentFragment();
var setAllElements = function (arr) {
  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(createMapPin(arr[i]));
  }
  return fragment;
};
setAllElements(massAdds);

similarListElement.appendChild(fragment);
//mapShow.querySelector('.map').classList.remove('map--faded');

var similarAdvertTemplate = document.querySelector('template').content.querySelector('.map__card');
var createAdvert = function (massAdds) {
  var advertElement = similarAdvertTemplate.cloneNode(true);
  advertElement.querySelector('.popup__title').textContent = massAdds.offer.title;
  advertElement.querySelector('.popup__text--address').textContent = massAdds.offer.address;
  advertElement.querySelector('.popup__text--price').textContent = massAdds.offer.price + '=/ночь';
  advertElement.querySelector('.popup__type').textContent = typeChoice[massAdds.offer.type];
  advertElement.querySelector('.popup__text--capacity').textContent = massAdds.offer.rooms + 'комнаты для ' + massAdds.offer.guests + 'гостей';
  advertElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + massAdds.offer.checking + ', выезд до ' + massAdds.offer.checkout;
  var featuresForFill = document.querySelector('.popup__features');
  var featureItems = advertElement.querySelectorAll('.popup__feature');
  var fillInPopUpFeature = function () {
    for (var i = 0; i < massAdds.offer.features.length; i++) {
      featureItems[i].textContent = massAdds.offer.features[i];
    }
    return featureItems;
  };
  //advertElement.featuresForFill.appendChild(fillInPopUpFeature());
  advertElement.querySelector('.popup__description').textContent = massAdds.offer.description;
  advertElement.querySelector('.popup__photos').querySelector('img').src = photosAll[0];
  for (var i = 1; i < photosAll.length; i++) {
    advertElement.querySelector('.popup__photos').appendChild('img').classList.add('popup__photo').src = photosAll[i];
  }  
  advertElement.querySelector('.popup__avatar').src = massAdds.author;
  return advertElement;
};

var block = document.querySelector('.map__filters-container');
var putElementInContainer = function () {
block.insertAdjacentHTML('beforebegin', createAdvert(massAdds[0]));
return block;
};
putElementInContainer();
