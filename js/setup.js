'use strict';
(function () {
  var util = window.util;
  var dialog = window.dialog;
  var backend = window.backend;
  var updateWizards = window.updateWizards;
  var itemBackpack = window.dialog.setup.querySelector('.setup-artifacts');
  var itemSlots = itemBackpack.querySelectorAll('.setup-artifacts-cell');
  var shopItem = window.dialog.setup.querySelector('.star');
  var setup = document.querySelector('.setup');
  var setupInputName = setup.querySelector('.setup-user-name');
  var setupWizardCoat = setup.querySelector('.wizard-coat');
  var inputWizardCoat = setup.querySelector('input[name="coat-color"]');
  var setupWizardEyes = setup.querySelector('.wizard-eyes');
  var inputWizardEyes = setup.querySelector('input[name="eyes-color"]');
  var setupFireBallWrap = setup.querySelector('.setup-fireball-wrap');
  var inputFireBallColor = setup.querySelector('input[name="fireball-color"]');
  var WIZARD_SAVE_URL = 'https://js.dump.academy/code-and-magick';
  var form = window.dialog.setup.querySelector('.setup-wizard-form');

  var COAT_COLORS = [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ];

  var EYES_COLORS = [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ];

  var FIREBALLS_COLORS = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
  ];

  var generateFireBallsColor = function () {
    return FIREBALLS_COLORS[Math.floor(Math.random() * (FIREBALLS_COLORS.length))];
  };

  var generateCoatColor = function () {
    return COAT_COLORS[Math.floor(Math.random() * (COAT_COLORS.length))];
  };

  var generateEyesColor = function () {
    return EYES_COLORS[Math.floor(Math.random() * (EYES_COLORS.length))];
  };

  var onSuccessSave = function () {
    dialog.closeDialog();
  };

  var errorHandler = util.errorHandler;

  form.addEventListener('submit', function (evt) {
    backend.save(WIZARD_SAVE_URL, new FormData(form), onSuccessSave, errorHandler);
    evt.preventDefault();
  });

  setupInputName.addEventListener('focus', function () {
    util.isEscEventDisabled = true;
  });

  setupInputName.addEventListener('blur', function () {
    util.isEscEventDisabled = false;
  });

  setupFireBallWrap.addEventListener('click', function () {
    var color = generateFireBallsColor();
    setupFireBallWrap.style.background = color;
    inputFireBallColor.value = color;
  });

  setupWizardEyes.addEventListener('click', function () {
    var color = generateEyesColor();
    setupWizardEyes.style.fill = color;
    inputWizardEyes.value = color;
    updateWizards(inputWizardCoat.value, inputWizardEyes.value);
  });

  setupWizardCoat.addEventListener('click', function () {
    var color = generateCoatColor();
    setupWizardCoat.style.fill = color;
    inputWizardCoat.value = color;
    updateWizards(inputWizardCoat.value, inputWizardEyes.value);
  });

  var onItemDragStart = function () {
    itemSlots.forEach(function (item) {
      item.addEventListener('dragenter', onItemDragEnter, false);
      item.addEventListener('dragleave', onItemDragLeave, false);
      item.addEventListener('dragover', onItemDragOver, false);
      item.addEventListener('drop', onItemDragDrop, false);
    });

    return true;
  };

  var onItemDragOver = function (evt) {
    evt.preventDefault();
  };

  var onItemDragEnter = function (evt) {
    evt.target.style.opacity = '0.5';
    evt.preventDefault();
    return true;
  };

  var onItemDragLeave = function (evt) {
    evt.target.style = '';
    evt.preventDefault();
    return true;
  };

  var onItemDragDrop = function (evt) {
    evt.target.appendChild(shopItem);
    evt.target.style = '';
    evt.stopPropagation();
    return false;
  };

  var onItemDragEnd = function () {
    itemSlots.forEach(function (item) {
      item.removeEventListener('dragenter', onItemDragEnter, false);
      item.removeEventListener('dragleave', onItemDragLeave, false);
      item.removeEventListener('dragover', onItemDragOver, false);
      item.removeEventListener('drop', onItemDragDrop, false);
    });
    shopItem.removeEventListener('dragend', onItemDragEnd, false);
  };

  shopItem.addEventListener('dragstart', onItemDragStart, false);
  shopItem.addEventListener('dragend', onItemDragEnd, false);

})();
