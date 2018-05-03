'use strict';

(function () {
  window.loadData = function (url, onLoad, onError) {
    var URL = 'https://js.dump.academy/keksobooking/data';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      onLoad(xhr.response);
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
      var errorHandler = function (errorMessage) {
        var showMessage = document.createElement('div');
        showMessage.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
        showMessage.style.position = 'absolute';
        showMessage.style.left = 0;
        showMessage.style.right = 0;
        showMessage.style.fontSize = '30px';
        showMessage.textContent = errorMessage;
        document.body.insertAdjacentElement('afterbegin', showMessage);
      };
      window.load(errorHandler);
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = 1000;
    xhr.open('GET', URL);
    xhr.send();
  };

  window.sendInfoToServer = function (data, onLoad, onError) {
    var URL = 'https://js.dump.academy/keksobooking';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      onLoad(xhr.response);
    });
    xhr.addEventListener('error', function () {
      if (onError('Произошла ошибка соединения')) {
        onError('Произошла ошибка соединения');
      } else if (onError(xhr.status + ' ' + xhr.statusText)) {
        onError(xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.open('POST', URL);
    xhr.send(data);
  };
})();
