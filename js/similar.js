'use strict';
(function () {
  var backend = window.backend;
  var render = window.render;
  var utils = window.util;
  var WIZARDS_GET_URL = 'https://js.dump.academy/code-and-magick/data';
  var setup = document.querySelector('.setup');
  var inputWizardCoat = setup.querySelector('input[name="coat-color"]');
  var inputWizardEyes = setup.querySelector('input[name="eyes-color"]');
  var wizards = [];
  var coatColor = inputWizardCoat.value;
  var eyesColor = inputWizardEyes.value;

  var successHandler = function (data) {
    wizards = data;
    window.updateWizards();
  };

  var errorHandler = utils.errorHandler;

  window.updateWizards = window.debounce(function (newCoatColor, newEyesColor) {
    coatColor = newCoatColor ? newCoatColor : coatColor;
    eyesColor = newEyesColor ? newEyesColor : eyesColor;

    var sameCoatAndEyesWizards = wizards.filter(function (it) {
      return it.colorCoat === coatColor &&
        it.colorEyes === eyesColor;
    });

    var sameCoatWizards = wizards.filter(function (it) {
      return it.colorCoat === coatColor;
    });
    var sameEyesWizards = wizards.filter(function (it) {
      return it.colorEyes === eyesColor;
    });

    var filteredWizards = sameCoatAndEyesWizards
      .concat(sameCoatWizards)
      .concat(sameEyesWizards)
      .concat(wizards);

    var uniqueWizards =
      filteredWizards.filter(function (it, i) {
        return filteredWizards.indexOf(it) === i;
      });

    render(uniqueWizards);
  });

  backend.load(WIZARDS_GET_URL, successHandler, errorHandler);
})();
