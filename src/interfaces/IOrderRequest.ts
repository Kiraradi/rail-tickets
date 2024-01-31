export interface IOrderRequest {
    user?: IUser | null
    departure?: IArrivalAndDepartureOrder | null
    arrival?: IArrivalAndDepartureOrder | null
}

export interface IUser {
    first_name: string
    last_name: string
    patronymic?: string | null
    phone: string
    email: string
    payment_method: PaymentMethod
}

export enum PaymentMethod { 
	cash = 'cash',
	online  = 'online'
};

export interface IArrivalAndDepartureOrder {
    route_direction_id: string | null
    seats: ISeatOrder[]
}

export interface ISeatOrder {
    coach_id: string
    person_info?: IPersonInfo | null
    seat_number: number
    is_child?: boolean
    include_children_seat?: boolean
}

export interface IPersonInfo {
    is_adult: boolean
    first_name: string
    last_name: string
    patronymic?: string | null
    gender: boolean
    birthday: string
    document_type: string
    document_data: string
}