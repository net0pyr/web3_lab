import { redrawGraph } from './area.js';

export function checkResult(result) {
    console.log('Результат проверки выстрела:', result);
    isRChanged = true;
    if (result) {
        points.push({ x: valueX, y: valueY, color: 'pink' });
    } else {
        points.push({ x: valueX, y: valueY, color: '#ffffff' });
    }

    redrawGraph(valueR);

    document.getElementById('r').value = '';
    document.getElementById('x').value = '';
    document.getElementById('y').value = '';

    const table = document.querySelector('#results tbody');
    const newRow = table.insertRow();

    const cellX = newRow.insertCell(0);
    const cellY = newRow.insertCell(1);
    const cellR = newRow.insertCell(2);
    const cellResult = newRow.insertCell(3);

    const fine = Math.floor(Math.random() * (10 ** 9 - 10 ** 6 + 1)) + 10 ** 6;

    cellX.textContent = valueX;
    cellY.textContent = valueY;
    cellR.textContent = valueR;
    cellResult.textContent = result ? fine : 0;

    valueFine += result ? fine : 0;

    document.getElementById('fine').textContent = valueFine;
}