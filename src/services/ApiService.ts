import { ICity } from "../interfaces/ICity";
import { IDirectionsRequest } from "../interfaces/IDirectionsRequest";
import { IDirectionsResponse } from "../interfaces/IDirectionsResponse";

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

    static async getDirections(request: IDirectionsRequest): Promise<IDirectionsResponse> {

        let directions = {} as IDirectionsResponse;

        const params = (Object.keys(request) as (keyof typeof request)[])
            .filter(key => request[key] !== null)
            .map(key => `${key}=${request[key]}`);

        const paramsString = params.join('&');
        
        let url = `https://students.netoservices.ru/fe-diplom/routes?${paramsString}`;

        const response = await fetch(url);

        if (response.ok) {
            directions = await response.json()
        } else {
            console.log("Ошибка HTTP: " + response.status);
        }

        return directions;
        
    }
}