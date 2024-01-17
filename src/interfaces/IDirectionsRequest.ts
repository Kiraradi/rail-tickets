export interface IDirectionsRequest {
    from_city_id: string
    to_city_id: string
    date_start?: string | null
    date_end?: string | null
    date_start_arrival?: string | null
    date_end_arrival?: string | null
    have_first_class?: boolean | null
    have_second_class?: boolean | null
    have_third_class?: boolean | null
    have_fourth_class?: boolean | null
    have_wifi?: boolean | null
    have_air_conditioning?: boolean | null
    have_express?: boolean | null
    price_from?: number | null
    price_to?:number | null
    start_departure_hour_from?: number | null
    start_departure_hour_to?: number | null
    start_arrival_hour_from?: number | null
    start_arrival_hour_to?: number | null
    end_departure_hour_from?: number | null
    end_departure_hour_to?: number | null
    end_arrival_hour_from?: number | null
    end_arrival_hour_to?: number | null
    limit?: number | null
    offset?: number | null
    sort?: any | null
}