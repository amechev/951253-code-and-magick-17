'use strict';
(function () {
  window.renderStatistics = function (ctx, names, times) {
    var BG_COLOR = 'rgba(256, 256, 256, 1)';
    var SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
    var TXT_COLOR = 'rgba(0, 0, 0, 0.8)';
    var COLUMN_WIDTH = 40;
    var COLUMN_HEIGTH = 150;
    var COLUMN_DISTANCE = 50;

    var position = 65;
    var item = {};
    var maxScore = getMaximumValue(times);

    drawField(ctx, SHADOW_COLOR, BG_COLOR, TXT_COLOR);
    drawTitle(ctx, TXT_COLOR);

    for (var i = 0; i < names.length; i++) {
      if (names[i] && times[i]) {
        position += COLUMN_DISTANCE + COLUMN_WIDTH;
        item = {
          name: names[i],
          time: Math.round(times[i]),
          color: getColumnColor(names[i]),
          TXT_COLOR: TXT_COLOR,
          position: position,
          maxHeight: COLUMN_HEIGTH,
          width: COLUMN_WIDTH
        };
        drawColumn(ctx, item, maxScore);
      }
    }
  };

  // Функция отрисовки поля
  function drawField(ctx, SHADOW_COLOR, BG_COLOR) {
    ctx.fillStyle = SHADOW_COLOR;
    ctx.fillRect(110, 20, 420, 270);

    ctx.fillStyle = BG_COLOR;
    ctx.fillRect(100, 10, 420, 270);
  }

  // Функция отрисовки колонки
  function drawColumn(ctx, item, maxScore) {
    var itemHeight = item.maxHeight / maxScore * item.time;
    var namePosition = item.maxHeight + 110;
    var scorePosition = item.maxHeight + 80 - itemHeight;

    ctx.fillStyle = item.color;
    ctx.fillRect(item.position, item.maxHeight + 100 - itemHeight, item.width, itemHeight);
    ctx.fillStyle = item.TXT_COLOR;
    ctx.font = '16px PT Mono';
    ctx.fillText(item.name, item.position, namePosition);
    ctx.fillText(item.time, item.position, scorePosition);
  }

  // Функция получения цвета колонки
  function getColumnColor(name) {
    if (name === 'Вы') {
      return 'rgb(256, 0, 0)';
    }
    return 'rgba(0, 0, 256, 0.' + Math.floor(Math.random() * (9 - 1) + 1) + ')';
  }

  // Функция отрисовки заголовка
  function drawTitle(ctx, TXT_COLOR) {
    ctx.fillStyle = TXT_COLOR;
    ctx.font = '16px PT Mono';
    ctx.textBaseline = 'hanging';
    ctx.fillText('Ура вы победили!', 130, 30);
    ctx.fillText('Список результатов:', 130, 50);
  }

  // Функция получения максимального результата из массива times
  function getMaximumValue(times) {
    var maxScore = 0;
    for (var i = 0; i < times.length; i++) {
      if (times[i] > maxScore) {
        maxScore = Math.floor(times[i]);
      }
    }

    return maxScore;
  }
})();
