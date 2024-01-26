import { ICity } from "./ICity"


export interface IFromAndTo {
    datetime?: number
    railway_station_name?: string
    city?:ICity
}

export interface ITrain {
    name: string
    _id: string
}

export interface IArrivalAndDeparture {
    have_first_class?: boolean 
    have_second_class?: boolean
    have_third_class?: boolean 
    have_fourth_class?: boolean 
    have_wifi?: boolean 
    have_air_conditioning?: boolean
    is_express?: boolean
    min_price?: number
    train?: ITrain
    from?: IFromAndTo
    to?: IFromAndTo
    duration?: number
    price_info?: any
    available_seats_info?: any
    _id: string
}
export interface IDirection {
    have_first_class?: boolean
    have_second_class?: boolean
    have_third_class?: boolean
    have_fourth_class?: boolean 
    have_wifi?: boolean
    have_air_conditioning?: boolean
    is_express?: boolean 
    min_price?: number
    arrival?: IArrivalAndDeparture
    departure?: IArrivalAndDeparture
    avaliable_seats?: number
}


export interface IDirectionsResponse {
    total_count: number
    items: IDirection[]
    error?:string
}