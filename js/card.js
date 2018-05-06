'use strict';

(function () {
  var similarAdvertTemplate = document.querySelector('template').content.querySelector('.map__card');
  var block = document.querySelector('.map__filters-container');
  var ESC_KEYCODE = 27;
  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePopup();
    }
  };
  var closePopup = function () {
    var popup = window.pins.mapShow.querySelector('.popup');
    if (popup !== null) {
      window.pins.mapShow.removeChild(popup);
    }
    document.removeEventListener('keydown', onPopupEscPress);
  };

  var createAdvert = function (item) {
    var advertElement = similarAdvertTemplate.cloneNode(true);
    advertElement.querySelector('.popup__avatar').src = item.author.avatar;
    advertElement.querySelector('.popup__title').textContent = item.offer.title;
    advertElement.querySelector('.popup__text--address').textContent = item.offer.address;
    advertElement.querySelector('.popup__text--price').textContent = item.offer.price + '=/ночь';
    advertElement.querySelector('.popup__type').textContent = window.data.typeChoice[item.offer.type];
    advertElement.querySelector('.popup__text--capacity').textContent = item.offer.rooms + ' комнаты для ' + item.offer.guests + ' гостей';
    advertElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + item.offer.checkin + ', выезд до ' + item.offer.checkout;
    var featuresForFill = advertElement.querySelector('.popup__features');
    featuresForFill.innerHTML = '';
    /* for (var i = 0; i < item.offer.features.length; i++) {
      var feature = document.createElement('li');
      feature.classList.add('popup__feature', 'popup__feature--' + item.offer.features[i]);
      featuresForFill.appendChild(feature);
    } */
    item.offer.features.forEach(function (ite, i) {
      var feature = document.createElement('li');
      feature.classList.add('popup__feature', 'popup__feature--' + item.offer.features[i]);
      featuresForFill.appendChild(feature);
    });
    advertElement.querySelector('.popup__description').textContent = item.offer.description;
    var photoContainer = advertElement.querySelector('.popup__photos');
    photoContainer.innerHTML = '';
    /* for (i = 0; i < item.offer.photos.length; i++) {
      var photo = document.createElement('img');
      photo.classList.add('popup__photo');
      photo.width = 45;
      photo.height = 40;
      photo.src = item.offer.photos[i];
      photoContainer.appendChild(photo);
    } */
    item.offer.photos.forEach(function (te, i) {
      var photo = document.createElement('img');
      photo.classList.add('popup__photo');
      photo.width = 45;
      photo.height = 40;
      photo.src = item.offer.photos[i];
      photoContainer.appendChild(photo);
    });

    block.insertAdjacentElement('beforeBegin', advertElement);

    var closeButton = advertElement.querySelector('.popup__close');

    closeButton.addEventListener('click', function () {
      closePopup();
    });
    document.addEventListener('keydown', onPopupEscPress);
  };

  window.card = {
    createAdvert: createAdvert,
    closePopup: closePopup,
    ESC_KEYCODE: ESC_KEYCODE
  };
})();
