function createArea() {
    board = JXG.JSXGraph.initBoard('jxgbox', {
        boundingbox: [-1.2 * valueR, 1.2 * valueR, 1.2 * valueR, -1.2 * valueR],
        axis: true,
        showCopyright: false,
        showNavigation: false,
    });

    // Настройка оси X: подпись сверху, деления без числовых меток
    board.defaultAxes.x.setAttribute({
        withLabel: true,
        label: {
            offset: [0, 15], // Сдвиг подписи оси X вверх
            strokeColor: '#FFFFFF', // Цвет подписи оси
            fontSize: 16,
            position: 'rt' // Позиция "справа вверху" для подписи
        },
        ticks: {
            visible: true,
            strokeColor: '#FFFFFF', // Цвет линий делений
            label: { visible: false } // Скрывает числовые метки делений
        }
    });

    // Настройка оси Y: подпись справа, деления без числовых меток
    board.defaultAxes.y.setAttribute({
        withLabel: true,
        label: {
            offset: [15, 0], // Сдвиг подписи оси Y вправо
            strokeColor: '#FFFFFF',
            fontSize: 16,
            position: 'rt' // Позиция "справа вверху" для подписи
        },
        ticks: {
            visible: true,
            strokeColor: '#FFFFFF',
            label: { visible: false } // Скрывает числовые метки делений
        }
    });

    // Создаем прямоугольник как полигон
    const rectangle = board.create('polygon', [
        [0 * valueR, 0 * valueR],       // Первая точка (нижний левый угол)
        [0.5 * valueR, 0 * valueR],       // Вторая точка (нижний правый угол)
        [0.5 * valueR, 1 * valueR],       // Третья точка (верхний правый угол)
        [0 * valueR, 1 * valueR]        // Четвертая точка (верхний левый угол)
    ], {
        fillColor: '#00f',      // Цвет заливки
        fillOpacity: 0.5,       // Прозрачность заливки
        borders: { visible: false },  // Скрыть границы (если нужно)
        vertices: { visible: false },     // Скрыть границы
        highlight: false               // Отключить изменение цвета при наведении
    });

    // Создаем прямоугольник как полигон
    const triangle = board.create('polygon', [
        [0 * valueR, 0 * valueR],       // Первая точка (нижний левый угол)
        [0 * valueR, 1 * valueR],       // Вторая точка (нижний правый угол)
        [-1 * valueR, 0 * valueR],       // Третья точка (верхний правый угол)
    ], {
        fillColor: '#00f',      // Цвет заливки
        fillOpacity: 0.5,       // Прозрачность заливки
        borders: { visible: false },  // Скрыть границы (если нужно)
        vertices: { visible: false },     // Скрыть границы
        highlight: false               // Отключить изменение цвета при наведении
    });

    // Центр круга, скрытый и неизменяемый
    const center = board.create('point', [0 * valueR, 0 * valueR], { visible: false, fixed: true });

    // Радиусная точка, скрытая и неизменяемая
    const radiusPoint = board.create('point', [0 * valueR, -1 * valueR], { visible: false, fixed: true });

    // Точка на границе сектора, скрытая и неизменяемая (определяет сектор между radiusPoint и этой точкой)
    const edgePoint = board.create('point', [1 * valueR, 0 * valueR], { visible: false, fixed: true });

    // Создаем сектор круга
    const sector = board.create('sector', [center, radiusPoint, edgePoint], {
        fillColor: '#00f',       // Цвет заливки
        fillOpacity: 0.5,           // Прозрачность заливки
        strokeOpacity: 0,            // Убираем границу, делая ее полностью прозрачной
        fixed: true,                 // Сектор не может быть изменен пользователем
        highlight: false               // Отключить изменение цвета при наведении
    });

    const google_icon1 = board.create('image', [
        'images/google_icon.png',  // Относительный путь к изображению
        [0.1 * valueR, -0.75 * valueR],       // Координаты нижнего левого угла изображения
        [0.65 * valueR, 0.65 * valueR]        // Размеры изображения (ширина, высота)
    ], {
        fixed: true,    // Неизменяемое изображение
        highlight: false,               // Отключить изменение цвета при наведении
        layer: 10
    });


    const google_icon2 = board.create('image', [
        'images/google_icon.png',  // Относительный путь к изображению
        [0 * valueR, 0.4 * valueR],       // Координаты нижнего левого угла изображения
        [0.45 * valueR, 0.45 * valueR]        // Размеры изображения (ширина, высота)
    ], {
        fixed: true,    // Неизменяемое изображение
        highlight: false,               // Отключить изменение цвета при наведении
        layer: 10
    });

    const google_icon3 = board.create('image', [
        'images/google_icon.png',  // Относительный путь к изображению
        [-0.33 * valueR, 0.36 * valueR],       // Координаты нижнего левого угла изображения
        [0.3 * valueR, 0.3 * valueR]        // Размеры изображения (ширина, высота)
    ], {
        fixed: true,    // Неизменяемое изображение
        highlight: false,               // Отключить изменение цвета при наведении
        layer: 10
    });

    const google_string = board.create('image', [
        'images/google_string.png',  // Относительный путь к изображению
        [-0.66 * valueR, 0 * valueR],       // Координаты нижнего левого угла изображения
        [1.1 * valueR, 0.36 * valueR]        // Размеры изображения (ширина, высота)
    ], {
        fixed: true,    // Неизменяемое изображение
        highlight: false,               // Отключить изменение цвета при наведении
        layer: 10
    });

    function showLabels() {
        board.defaultAxes.x.setAttribute({
            ticks: {
                label: { visible: true, strokeColor: '#FFFFFF' }
            }
        });

        board.defaultAxes.y.setAttribute({
            ticks: {
                label: { visible: true, strokeColor: '#FFFFFF' }
            }
        });
        board.update();
    }

    function hideLabels() {
        board.defaultAxes.x.setAttribute({
            ticks: {
                label: { visible: false }
            }
        });

        board.defaultAxes.y.setAttribute({
            ticks: {
                label: { visible: false }
            }
        });
        board.update();
    }

    board.on('down', function (e) {
        if (!isRChanged) {
            alert('Выберите радиус, чтобы создать свой первый штраф');
            return;
        }
        const coords = board.getCoordsTopLeftCorner(e);
        const x = board.getUsrCoordsOfMouse(e)[0].toFixed(2);
        const y = board.getUsrCoordsOfMouse(e)[1].toFixed(2);
        console.log(`Координаты точки нажатия: x = ${x}, y = ${y}`);
    });

    if (isRChanged) {
        showLabels();
    } else {
        hideLabels();
    }
}

function redrawGraph(valueR) {
    // Удаляем старый график
    JXG.JSXGraph.freeBoard(board);

    // Создаем новый график
    createArea(valueR);
}



document.addEventListener("DOMContentLoaded", function () {
    createArea();

    document.getElementById('updateRButton').addEventListener('click', function () {
        let r = document.getElementById('r').value;
        if (r === '') {
            alert('Введите радиус');
            return;
        }
        if (isNaN(r)) {
            alert('Радиус должен быть числом');
            return;
        }
        if (r <= 0 || r > 5) {
            alert('Радиус должен быть в диапозоне от 0 до 5');
            return;
        }
        valueR = parseFloat(r);
        isRChanged = true;
        redrawGraph(valueR);
        document.getElementById('r').value = '';

    });
});