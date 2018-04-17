'use strict';

var ADDS_COUNT = 8;
var MAP_PIN_WIDTH = 40;
var MAP_PIN_HEIGHT = 40;
var avatars = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'];
var titlesTypes = {
  titles: ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'],
  types: ['flat', 'flat', 'palace', 'palace', 'house', 'house', 'bungalo', 'bungalo']
};
var addresses = ['600, 350', '350, 600', '1000, 700', '1100, 350', '900, 550', '800, 400', '500, 550', '200, 700'];
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

var massNew = [];
var chooseFeatures = function (arr) {
  massNew = arr.slice();
  massNew.splice(chooseRandom(massNew), Math.floor(Math.random() * (massNew.length)));
  return massNew;
};

var massAdds = [];
var fillMassAdds = function () {
  for (var i = 0; i < ADDS_COUNT; i++) {
    massAdds[i] = {
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
        photos: photosAll
      },
      location: {
        x: getRandomInt(300, 900),
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
  mapPinElement.style = 'left: ' + (mapPin.location.x - MAP_PIN_WIDTH / 2) + 'px;' + 'top: ' + (mapPin.location.y - MAP_PIN_HEIGHT) + 'px;';
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

var similarAdvertTemplate = document.querySelector('template').content.querySelector('.map__card');

var createAdvert = function (item) {
  var advertElement = similarAdvertTemplate.cloneNode(true);
  advertElement.querySelector('.popup__title').textContent = item.offer.title;
  advertElement.querySelector('.popup__text--address').textContent = item.offer.address;
  advertElement.querySelector('.popup__text--price').textContent = item.offer.price + '=/ночь';
  advertElement.querySelector('.popup__type').textContent = typeChoice[item.offer.type];
  advertElement.querySelector('.popup__text--capacity').textContent = item.offer.rooms + ' комнаты для ' + item.offer.guests + ' гостей';
  advertElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + item.offer.checking + ', выезд до ' + item.offer.checkout;
  var featuresForFill = advertElement.querySelector('.popup__features');
  featuresForFill.innerHTML = '';
  for (var i = 0; i < item.offer.features.length; i++) {
    var feature = document.createElement('li');
    feature.classList.add('popup__feature', 'popup__feature--' + item.offer.features[i]);
    featuresForFill.appendChild(feature);
  }  
  advertElement.querySelector('.popup__description').textContent = item.offer.description;
  var photoContainer = advertElement.querySelector('.popup__photos');
  photoContainer.innerHTML = '';
  for (i = 0; i < photosAll.length; i++) {
    var photo = document.createElement('img');
    photo.classList.add('popup__photo');
    photo.width = 45;
    photo.height = 40;
    photo.src = photosAll[i];
    photoContainer.appendChild(photo);
  }  
  return advertElement;
};
  
var block = document.querySelector('.map__filters-container');
var putElementInContainer = function () {
  block.insertAdjacentElement('beforeBegin', createAdvert(massAdds[0]));
  return block;
};
putElementInContainer();
