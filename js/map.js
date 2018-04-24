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
var minPriceForNight = {
  flat: 1000,
  palace: 10000,
  house: 5000,
  bungalo: 0
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

var mainPin = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var fieldsets = document.querySelectorAll('.ad-form fieldset');
var adFormAddress = document.querySelector('#address');
var MAP_PIN_MAIN_LEFT = 570;
var MAP_PIN_MAIN_TOP = 375;
var MAP_PIN_MAIN_HEIGHT = 40;
var MAP_PIN_MAIN_CORNER = 22;

var similarListElement = document.querySelector('.map__pins');
var similarMapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');

var closePopup = function () {
  var popup = mapShow.querySelector('.popup');
  if (popup !== null) {
    mapShow.removeChild(popup);
  }
};

var createMapPin = function (mapPin) {
  var mapPinElement = similarMapPinTemplate.cloneNode(true);
  mapPinElement.style = 'left: ' + (mapPin.location.x - MAP_PIN_WIDTH / 2) + 'px;' + 'top: ' + (mapPin.location.y - MAP_PIN_HEIGHT) + 'px;';
  mapPinElement.querySelector('img').src = mapPin.author;
  mapPinElement.querySelector('img').alt = mapPin.title;

  mapPinElement.addEventListener('click', function () {
    closePopup();
    createAdvert(mapPin);
  });

  return mapPinElement;
};

var fragment = document.createDocumentFragment();
var setAllElements = function (arr) {
  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(createMapPin(arr[i]));
  }
  return fragment;
};

adFormAddress.value = MAP_PIN_MAIN_LEFT + ', ' + MAP_PIN_MAIN_TOP;

mainPin.addEventListener('mouseup', function () {
  mapShow.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  for (var i = 0; i < fieldsets.length; i++) {
    fieldsets[i].removeAttribute('disabled');
  }
  adFormAddress.value = (MAP_PIN_MAIN_LEFT + MAP_PIN_WIDTH / 2) + ', ' + (MAP_PIN_MAIN_TOP + MAP_PIN_MAIN_HEIGHT + MAP_PIN_MAIN_CORNER);

  setAllElements(massAdds);
  similarListElement.appendChild(fragment);
});

var similarAdvertTemplate = document.querySelector('template').content.querySelector('.map__card');
var block = document.querySelector('.map__filters-container');

var createAdvert = function (item) {
  var advertElement = similarAdvertTemplate.cloneNode(true);
  advertElement.querySelector('.popup__avatar').src = item.author;
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

  block.insertAdjacentElement('beforeBegin', advertElement);

  var closeButton = advertElement.querySelector('.popup__close');

  closeButton.addEventListener('click', function () {
    closePopup();
  });
};

var typeOfLiving = adForm.querySelector('#type');
var itemsOfLiving = typeOfLiving.querySelectorAll('option');
var inputPrice = adForm.querySelector('#price');

typeOfLiving.addEventListener('input', function () {
  for (var j = 0; j < itemsOfLiving.length; j++) {
    if (itemsOfLiving[j].value === 'flat') {
      inputPrice.min = minPriceForNight.flat;
      inputPrice.placeholder = minPriceForNight.flat;
      inputPrice.value = minPriceForNight.flat;
    }
    if (itemsOfLiving[j].value === 'bungalo') {
      inputPrice.min = minPriceForNight.bungalo;
      inputPrice.placeholder = minPriceForNight.bungalo;
      inputPrice.value = minPriceForNight.bungalo;
    }
    if (itemsOfLiving[j].value === 'house') {
      inputPrice.min = minPriceForNight.house;
      inputPrice.placeholder = minPriceForNight.house;
      inputPrice.value = minPriceForNight.house;
    }
    if (itemsOfLiving[j].value === 'palace') {
      inputPrice.min = minPriceForNight.palace;
      inputPrice.placeholder = minPriceForNight.palace;
      inputPrice.value = minPriceForNight.palace;
    }
  }  
});

var timesIn = adForm.querySelector('#timein');
var timeInOptions = timesIn.querySelectorAll('option');
var timesOut = adForm.querySelector('#timeout');
var timeOutOptions = timesOut.querySelectorAll('option');

var changeTimeSelection = function (timeInOptions, timeOutOptions) {
  for (var j = 0; j < timeInOptions.length; j++) {
    if (timeInOptions[j].value === '12:00') {
      timeOutOptions[j].value = timeInOptions[j].value;
    }
    if (timeInOptions[j].value === '13:00') {
      timeOutOptions[j].value = timeInOptions[j].value;
    }
    if (timeInOptions[j].value === '14:00') {
      timeOutOptions[j].value = timeInOptions[j].value;
    }    
  }  
};
changeTimeSelection();

var roomNumber = adForm.querySelector('#room_number');
var roomNumberOptions = roomNumber.querySelectorAll('option');
var guestsCapacity = adForm.querySelector('#capacity');
var guestsOptions = guestsCapacity.querySelectorAll('option');

var chooseRoomAndCapacity = function (roomNumberOptions, guestsOptions) {
  for (var j = 0; j < roomNumberOptions.length; j++) {
    if (roomNumberOptions[j].value === '1' && guestsOptions[j].value !== 1) {
      guestsOptions[j].setCustomValidity('Выбранное значение количества гостей не подходит под количество комнат');
    } else if (roomNumberOptions[j].value === '2' && (guestsOptions[j].value !== 1 || guestsOptions[j].value !== 2)) {
      guestsOptions[j].setCustomValidity('Выбранное значение количества гостей не подходит под количество комнат');
    } else if (roomNumberOptions[j].value === '3' && (guestsOptions[j].value !== 1 || guestsOptions[j].value !== 2 || guestsOptions[j].value !== 3)) {
      guestsOptions[j].setCustomValidity('Выбранное значение количества гостей не подходит под количество комнат');
    } else if (roomNumberOptions[j].value === '100' && guestsOptions[j].value !== 'не для гостей') {
      guestsOptions[j].setCustomValidity('для опции 100 комнат возможен только вариант "не для гостей"');
    } else {
      guestsOptions[j].setCustomValidity('');
    }
  }  
};

var titleForm = adForm.querySelector('#title');
adForm.addEventListener("submit", function (evt) {
  if (!titleForm.value || !inputPrice.value) {
    evt.preventDefault();
    titleForm.setCustomValidity('Заполните обязательное поле');
    inputPrice.setCustomValidity('Заполните обязательное поле');
  } else {
    titleForm.setCustomValidity('');
    inputPrice.setCustomValidity('');
  }
});