'use strict';
(function () {
  var util = window.util;
  var dialog = window.dialog;
  var itemBackpack = window.dialog.setup.querySelector('.setup-artifacts');
  var itemSlots = itemBackpack.querySelectorAll('.setup-artifacts-cell');
  var shopItem = window.dialog.setup.querySelector('.star');

  var WIZARDS_NAMES = [
    'Иван',
    'Хуан Себастьян',
    'Мария',
    'Кристоф',
    'Виктор',
    'Юлия',
    'Люпита',
    'Вашингтон'
  ];

  var WIZARDS_SURNAMES = [
    'да Марья',
    'Верон',
    'Мирабелла',
    'Вальц',
    'Онопко',
    'Топольницкая',
    'Нионго',
    'Ирвинг',
  ];

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

  var WIZARDS_CNT = 4;

  var generateName = function () {
    var name = WIZARDS_NAMES[Math.floor(Math.random() * (WIZARDS_NAMES.length))];
    var surname = WIZARDS_SURNAMES[Math.floor(Math.random() * (WIZARDS_SURNAMES.length))];
    return name + ' ' + surname;
  };

  var generateFireBallsColor = function () {
    return FIREBALLS_COLORS[Math.floor(Math.random() * (FIREBALLS_COLORS.length))];
  };

  var generateCoatColor = function () {
    return COAT_COLORS[Math.floor(Math.random() * (COAT_COLORS.length))];
  };

  var generateEyesColor = function () {
    return EYES_COLORS[Math.floor(Math.random() * (EYES_COLORS.length))];
  };

  var renderWizard = function () {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = generateName();
    wizardElement.querySelector('.wizard-coat').style.fill = generateCoatColor();
    wizardElement.querySelector('.wizard-eyes').style.fill = generateEyesColor();
    similarListElement.appendChild(wizardElement);

    return wizardElement;
  };

  var buildFragment = function () {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < WIZARDS_CNT; i++) {
      fragment.appendChild(renderWizard());
    }

    return fragment;
  };

  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

  var fragment = buildFragment();
  similarListElement.appendChild(fragment);

  document.querySelector('.setup-similar').classList.remove('hidden');

  var setup = document.querySelector('.setup');
  var elementSetupSubmit = setup.querySelector('.setup-submit');
  var setupInputName = setup.querySelector('.setup-user-name');
  var setupWizardCoat = setup.querySelector('.wizard-coat');
  var inputWizardCoat = setup.querySelector('input[name="coat-color"]');
  var setupWizardEyes = setup.querySelector('.wizard-eyes');
  var inputWizardEyes = setup.querySelector('input[name="eyes-color"]');
  var setupFireBallWrap = setup.querySelector('.setup-fireball-wrap');
  var inputFireBallColor = setup.querySelector('input[name="fireball-color"]');

  var submitSetup = function () {
    dialog.closeDialog();
  };

  elementSetupSubmit.addEventListener('click', function () {
    submitSetup();
  });

  elementSetupSubmit.addEventListener('keydown', function (evt) {
    util.isEnterEvent(evt, submitSetup());
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
  });

  setupWizardCoat.addEventListener('click', function () {
    var color = generateCoatColor();
    setupWizardCoat.style.fill = color;
    inputWizardCoat.value = color;
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
