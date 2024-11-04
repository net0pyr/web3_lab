import { fromEvent, from, tap } from 'https://cdn.jsdelivr.net/npm/rxjs@7.8.1/+esm';
import { map, filter, switchMap, catchError } from 'https://cdn.jsdelivr.net/npm/rxjs@7.8.1/operators/+esm';
import { checkResult } from './checkResult.js';

document.addEventListener("DOMContentLoaded", async function () {

    const form = document.getElementById("hitForm");

    const formSubmit$ = fromEvent(form, 'submit').pipe(
        map(event => {
            event.preventDefault();
            const formData = new FormData(form);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
            console.log('Отправка данных:', data);
            return data;
        }),
        filter(data => {
            if (!data.x || !data.y || !data.r) {
                alert('Пожалуйста, выберите значения для x, y и r.');
                return false;
            }
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
            const x = Math.floor(parseFloat(data.x) * (10 ** 6));
            const y = Math.floor(parseFloat(data.y) * (10 ** 6));
            const r = Math.floor(parseFloat(data.r) * (10 ** 6));

            valueX = data.x;
            valueY = data.y;
            valueR = data.r;

            console.log('Проверка выстрела:', x, y, r);
            return from(contract.methods.checkShot(x, y, r).call({ gas: 600000000 }));
        }),
        catchError(error => {
            console.error('Ошибка:', error);
            alert('Ошибка при проверке выстрела. Попробуйте еще раз.');
            throw error;
        })
    );


    formSubmit$.subscribe(result => {
        checkResult(result);
    });
});