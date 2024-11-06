import { fromEvent, from, tap } from 'https://cdn.jsdelivr.net/npm/rxjs@7.8.1/+esm';
import { map, filter, switchMap, catchError } from 'https://cdn.jsdelivr.net/npm/rxjs@7.8.1/operators/+esm';
import { checkResult } from './checkResult.js';

function createArea() {
    board = JXG.JSXGraph.initBoard('jxgbox', {
        boundingbox: [-1.2 * valueR, 1.2 * valueR, 1.2 * valueR, -1.2 * valueR],
        axis: true,
        showCopyright: false,
        showNavigation: false,
    });

    board.defaultAxes.x.setAttribute({
        withLabel: true,
        label: {
            offset: [0, 15], 
            strokeColor: '#FFFFFF', 
            fontSize: 16,
            position: 'rt' 
        },
        ticks: {
            visible: true,
            strokeColor: '#FFFFFF', 
            label: { visible: false } 
        }
    });

    board.defaultAxes.y.setAttribute({
        withLabel: true,
        label: {
            offset: [15, 0], 
            strokeColor: '#FFFFFF',
            fontSize: 16,
            position: 'rt' 
        },
        ticks: {
            visible: true,
            strokeColor: '#FFFFFF',
            label: { visible: false } 
        }
    });

    const rectangle = board.create('polygon', [
        [0 * valueR, 0 * valueR],  
        [0.5 * valueR, 0 * valueR],
        [0.5 * valueR, 1 * valueR],  
        [0 * valueR, 1 * valueR]  
    ], {
        fillColor: '#00f',  
        fillOpacity: 0.5,  
        borders: { visible: false }, 
        vertices: { visible: false }, 
        highlight: false       
    });

    const triangle = board.create('polygon', [
        [0 * valueR, 0 * valueR], 
        [0 * valueR, 1 * valueR],  
        [-1 * valueR, 0 * valueR], 
    ], {
        fillColor: '#00f',
        fillOpacity: 0.5,
        borders: { visible: false }, 
        vertices: { visible: false }, 
        highlight: false    
    });

    const center = board.create('point', [0 * valueR, 0 * valueR], { visible: false, fixed: true });

    const radiusPoint = board.create('point', [0 * valueR, -1 * valueR], { visible: false, fixed: true });

    const edgePoint = board.create('point', [1 * valueR, 0 * valueR], { visible: false, fixed: true });

    const sector = board.create('sector', [center, radiusPoint, edgePoint], {
        fillColor: '#00f',
        fillOpacity: 0.5, 
        strokeOpacity: 0,  
        fixed: true,        
        highlight: false         
    });

    const google_icon1 = board.create('image', [
        'images/google_icon.png', 
        [0.1 * valueR, -0.75 * valueR],   
        [0.65 * valueR, 0.65 * valueR]   
    ], {
        fixed: true,  
        highlight: false,     
        layer: 10
    });


    const google_icon2 = board.create('image', [
        'images/google_icon.png', 
        [0 * valueR, 0.4 * valueR],   
        [0.45 * valueR, 0.45 * valueR]  
    ], {
        fixed: true, 
        highlight: false,  
        layer: 10
    });

    const google_icon3 = board.create('image', [
        'images/google_icon.png', 
        [-0.33 * valueR, 0.36 * valueR],    
        [0.3 * valueR, 0.3 * valueR]      
    ], {
        fixed: true,  
        highlight: false,  
        layer: 10
    });

    const google_string = board.create('image', [
        'images/google_string.png',
        [-0.66 * valueR, 0 * valueR],  
        [1.1 * valueR, 0.36 * valueR]       
    ], {
        fixed: true,
        highlight: false,               
        layer: 10
    });

    points.forEach(point => {
        board.create('point', [point.x, point.y], { name: '', color: point.color, size: 2, layer: 10 });
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

    if (isRChanged) {
        showLabels();
    } else {
        hideLabels();
    }
}

export function redrawGraph(valueR) {
    JXG.JSXGraph.freeBoard(board);
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

    const boardDown$ = fromEvent(board.containerObj, 'mousedown').pipe(
        map(event => {
            if (!isRChanged) {
                throw new Error('Радиус не выбран');
            }
            const coords = board.getCoordsTopLeftCorner(event);
            const x = parseFloat(board.getUsrCoordsOfMouse(event)[0].toFixed(2));
            const y = parseFloat(board.getUsrCoordsOfMouse(event)[1].toFixed(2));
            console.log(`Координаты точки нажатия: x = ${x}, y = ${y}`);
            return { x, y, r: valueR };
        }),
        filter(data => {
            const minInt256 = -(2 ** 255);
            const maxInt256 = (2 ** 255) - 1;
            const x = Math.floor(data.x * (10 ** 6));
            const y = Math.floor(data.y * (10 ** 6));
            const r = Math.floor(data.r * (10 ** 6));

            if (data.x < -5 ||
                data.x > 5 ||
                isNaN(data.x) ||
                data.y < -5 ||
                data.y > 5 ||
                isNaN(data.y) ||
                data.r <= 0 ||
                data.r > 5 ||
                isNaN(data.r)) {
                alert('Неверный формат данных');
                return false;
            }
            return true;
        }),
        switchMap(data => {
            const x = Math.floor(data.x * (10 ** 6));
            const y = Math.floor(data.y * (10 ** 6));
            const r = Math.floor(data.r * (10 ** 6));

            valueX = data.x;
            valueY = data.y;

            return from(contract.methods.checkShot(x, y, r).call({ gas: 6000000 }));
        }),
        catchError(error => {
            console.error('Ошибка:', error);
            if (error.message === 'Радиус не выбран') {
                alert('Выберите радиус, чтобы создать свой первый штраф');
            } else {
                alert('Ошибка при проверке выстрела. Попробуйте еще раз.');
            }
            throw error;
        })
    );

    boardDown$.subscribe(result => {
        checkResult(result);
    });

});