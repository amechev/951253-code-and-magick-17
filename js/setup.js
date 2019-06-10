'use strict';

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

var WIZARDS_CNT = 4;

var generateName = function () {
  var name = WIZARDS_NAMES[Math.floor(Math.random() * (WIZARDS_NAMES.length))];
  var surname = WIZARDS_SURNAMES[Math.floor(Math.random() * (WIZARDS_SURNAMES.length))];
  return name + ' ' + surname;
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

document.querySelector('.setup').classList.remove('hidden');
document.querySelector('.setup-similar').classList.remove('hidden');
