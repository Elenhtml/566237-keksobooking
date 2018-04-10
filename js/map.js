'use strict';

var avatars = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'];
var featuresAll = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photosAll = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var massAdds = [
  {
    author: avatars[0],
    offer: {
      title: 'Большая уютная квартира',
      address: '600, 350',
      price: getRandomInt(1000, 1000000),
      type: 'flat',
      rooms: getRandomInt(1, 5),
      guests: getRandomInt(1, 30),
      checking: '12:00',
      checkout: '12:00',
      features: featuresAll,
      description: '',
      photos: photosAll
    },
    location: 'getRandomInt(300, 900), getRandomInt(150, 500)'
  },
  {
    author: avatars[1],
    offer: {
      title: 'Маленькая неуютная квартира',
      address: '350, 600',
      price: getRandomInt(1000, 1000000),
      type: 'flat',
      rooms: getRandomInt(1, 5),
      guests: getRandomInt(1, 30),
      checking: '12:00',
      checkout: '12:00',
      features: featuresAll,
      description: '',
      photos: photosAll
    },
    location: 'getRandomInt(300, 900), getRandomInt(150, 500)'
  },
  {
    author: avatars[2],
    offer: {
      title: 'Огромный прекрасный дворец',
      address: '1000, 700',
      price: getRandomInt(1000, 1000000),
      type: 'palace',
      rooms: getRandomInt(1, 5),
      guests: getRandomInt(1, 30),
      checking: '13:00',
      checkout: '13:00',
      features: featuresAll,
      description: '',
      photos: photosAll
    },
    location: 'getRandomInt(300, 900), getRandomInt(150, 500)'
  },
  {
    author: avatars[3],
    offer: {
      title: 'Маленький ужасный дворец',
      address: '1100, 350',
      price: getRandomInt(1000, 1000000),
      type: 'palace',
      rooms: getRandomInt(1, 5),
      guests: getRandomInt(1, 30),
      checking: '13:00',
      checkout: '13:00',
      features: featuresAll,
      description: '',
      photos: photosAll
    },
    location: 'getRandomInt(300, 900), getRandomInt(150, 500)'
  },
  {
    author: avatars[4],
    offer: {
      title: 'Красивый гостевой домик',
      address: '900, 550',
      price: getRandomInt(1000, 1000000),
      type: 'house',
      rooms: getRandomInt(1, 5),
      guests: getRandomInt(1, 30),
      checking: '14:00',
      checkout: '14:00',
      features: featuresAll,
      description: '',
      photos: photosAll
    },
    location: 'getRandomInt(300, 900), getRandomInt(150, 500)'
  },
  {
    author: avatars[5],
    offer: {
      title: 'Некрасивый негостеприимный домик',
      address: '800, 400',
      price: getRandomInt(1000, 1000000),
      type: 'house',
      rooms: getRandomInt(1, 5),
      guests: getRandomInt(1, 30),
      checking: '12:00',
      checkout: '12:00',
      features: featuresAll,
      description: '',
      photos: photosAll
    },
    location: 'getRandomInt(300, 900), getRandomInt(150, 500)'
  },
  {
    author: avatars[6],
    offer: {
      title: 'Уютное бунгало далеко от моря',
      address: '500, 550',
      price: getRandomInt(1000, 1000000),
      type: 'bungalo',
      rooms: getRandomInt(1, 5),
      guests: getRandomInt(1, 30),
      checking: '12:00',
      checkout: '12:00',
      features: featuresAll,
      description: '',
      photos: photosAll
    },
    location: 'getRandomInt(300, 900), getRandomInt(150, 500)'
  },
  {
    author: avatars[7],
    offer: {
      title: 'Неуютное бунгало по колено в воде',
      address: '200, 700',
      price: getRandomInt(1000, 1000000),
      type: 'bungalo',
      rooms: getRandomInt(1, 5),
      guests: getRandomInt(1, 30),
      checking: '13:00',
      checkout: '13:00',
      features: featuresAll,
      description: '',
      photos: photosAll
    },
    location: 'getRandomInt(300, 900), getRandomInt(150, 500)'
  }
];

var mapShow = document.querySelector('.map');
mapShow.classList.remove('map--faded');

var similarListElement = document.querySelector('.map__pins');
var similarMapPinTemplate = document.querySelector('.map__card').content.querySelector('.map__pin');

var createMapPin = function (mapPin) {
  var mapPinElement = similarMapPinTemplate.cloneNode(true);
  //mapPinElement.querySelector('.map__pin').style = mapPin.location(x-40) location(y-40);
  mapPinElement.querySelector('img').src = mapPin.author;
  mapPinElement.querySelector('img').alt = mapPin.title;
  return mapPinElement;
};

var fragment = document.createDocumentFragment();
for (var i=0; i < massAdds.length; i++) {
  fragment.appendChild(createMapPin(massAdds[i]));
}

similarListElement.appendChild(fragment);
mapShow.querySelector('.map').classList.remove('map--faded');

var similarAdvertTemplate = document.querySelector('.map__card').content;
var createAdvert = function (massAdds) {
  var advertElement = similarAdvertTemplate.cloneNode(true);
  advertElement.querySelector('.popup__title').textContent = massAdds.offer.title;
  advertElement.querySelector('.popup__text--address').textContent = massAdds.offer.address;
  advertElement.querySelector('.popup__text--price').textContent = massAdds.offer.price + '=/ночь';
  advertElement.querySelector('.popup__type').textContent = massAdds.offer.type;
  switch (massAdds.offer.type) {
    case 'bungalo': advertElement.querySelector('.popup__type').textContent = 'Бунгало' break,
    case 'flat': advertElement.querySelector('.popup__type').textContent = 'Квартира' break,
    case 'house': advertElement.querySelector('.popup__type').textContent = 'Дом' break,
    case 'palace': advertElement.querySelector('.popup__type').textContent = 'Дворец' break;
  }
  advertElement.querySelector('.popup__text--capacity').textContent = massAdds.offer.rooms + 'комнаты для ' + massAdds.offer.guests + 'гостей';
  advertElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + massAdds.offer.checking + ', выезд до ' + massAdds.offer.checkout;
  var featureItems = advertElement.queryselectorAll('.popup__feature');
    for (var i=0, j=0; i < featuresAll.length, j < featuresItems; i++, j++) {
      featureItems[i].appendChild(featuresAll[i]);
    }
  advertElement.querySelector('.popup__description').textContent = massAdds.offer.description;
  advertElement.querySelector('.popup__photos').querySelector('img').src = photosAll[0];
  for (i=1; i<photosAll.length; i++) {
    advertElement.querySelector('.popup__photos').appendChild('img').classList.add('popup__photo').src = photosAll[i];
  }
  avertElement.querySelector('.popup__avatar').src = massAds.author;
  return advertElement;
};

var block = document.querySelector('.map__filters-container');
block.insertAdjacentHTML('beforebegin', createAdvert(massAdds[0]));
