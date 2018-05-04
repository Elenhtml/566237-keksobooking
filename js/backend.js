'use strict';

(function () {
  /* var xhr = new XMLHttpRequest();
  var commonFunction = function () {
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      onLoad(xhr.response);
    });
  }; */
  var loadData = function (onLoad, onError) {
    var URL = 'https://js.dump.academy/keksobooking/data';
    // commonFunction();
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
        setTimeout(function () {
          showMessage.parentNode.removeChild(showMessage);
        }, 3000);
      };
      loadData(errorHandler);
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = 1000;
    xhr.open('GET', URL);
    xhr.send();
  };

  var sendInfoToServer = function (data, onLoad, onError) {
    var URL = 'https://js.dump.academy/keksobooking';
    // commonFunction();
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
  window.backend = {
    // commonFunction: commonFunction,
    loadData: loadData,
    sendInfoToServer: sendInfoToServer
  };
})();
