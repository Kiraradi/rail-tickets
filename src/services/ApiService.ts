import { ICity } from "../interfaces/ICity";
import { IDirectionsRequest } from "../interfaces/IDirectionsRequest";

export default class ApiService {

    static async getCities(text: string): Promise<ICity[]> {
        let cities: ICity[] = [];
        const response = await fetch(`https://students.netoservices.ru/fe-diplom/routes/cities?name=${text}`);

        if (response.ok) {
            cities = (await response.json()) as ICity[];
        } else {
            console.log("Ошибка HTTP: " + response.status);
        }

        return cities;
    }

    static getDirections(request: IDirectionsRequest): void {

        const params = (Object.keys(request) as (keyof typeof request)[])
            .filter(key => request[key] !== null)
            .map(key => `${key}=${request[key]}`);

        const paramsString = params.join('&');
        
        let url = `https://students.netoservices.ru/fe-diplom/routes?${paramsString}`;

        
       /* axios.get(url, requestConfig)
        .then(response => {
            console.log('response has arrived');
        })*/

        let xhr = new XMLHttpRequest();

        // 2. Настраиваем его: GET-запрос по URL /article/.../load
        xhr.open('GET', url);

        // 3. Отсылаем запрос
        xhr.send();

        // 4. Этот код сработает после того, как мы получим ответ сервера
        xhr.onload = function() {
        if (xhr.status != 200) { // анализируем HTTP-статус ответа, если статус не 200, то произошла ошибка
            console.log(`Ошибка ${xhr.status}: ${xhr.statusText}`); // Например, 404: Not Found
        } else { // если всё прошло гладко, выводим результат
            console.log(`Готово, получили ${xhr.response.length} байт`); // response -- это ответ сервера
        }
        };

        xhr.onprogress = function(event) {
        if (event.lengthComputable) {
            console.log(`Получено ${event.loaded} из ${event.total} байт`);
        } else {
            console.log(`Получено ${event.loaded} байт`); // если в ответе нет заголовка Content-Length
        }

        };

        xhr.onerror = function() {
            console.log("Запрос не удался");
        };
    }
}