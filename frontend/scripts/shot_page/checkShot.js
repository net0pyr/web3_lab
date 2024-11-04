import { fromEvent } from 'https://cdn.jsdelivr.net/npm/rxjs@7.8.1/+esm';
import { map, filter, switchMap, catchError } from 'https://cdn.jsdelivr.net/npm/rxjs@7.8.1/operators/+esm';


document.addEventListener("DOMContentLoaded", function () {
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
            if (!isValidY(data.y)) {
                alert('Значение y должно быть числом от -5 до 3.');
                return false;
            }
            return true;
        }),
        switchMap(data => {

        }),
        catchError(error => {
            console.error('Ошибка:', error);
            alert('Ошибка при проверке выстрела. Попробуйте еще раз.');
            throw error;
        })
    );

    formSubmit$.subscribe(({ data, json }) => {

    });
});

