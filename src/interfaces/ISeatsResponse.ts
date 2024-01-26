export interface ISeat {
    index: number
    available: number
}

export interface ICoach {
    _id: string
    name: string
    class_type: string
    have_wifi: boolean
    have_air_conditioning: boolean
    price: number
    top_price: number
    bottom_price: number
    side_price: number
    linens_price: number
    wifi_price: number
    avaliable_seats: number
    is_linens_included: boolean
}

export interface ISeatsResponse {
    coach: ICoach
    seats: ISeat[]
}