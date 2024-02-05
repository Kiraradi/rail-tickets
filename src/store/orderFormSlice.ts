import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IOrderRequest, IPersonInfo, ISeatOrder } from '../interfaces/IOrderRequest';
import { IDirection } from '../interfaces/IDirectionsResponse';

export interface IError {
    index: number,
    message: string
}

export interface IOrderFormSlice {
    orderForm: IOrderRequest,
    errors: IError[]
}

const initialState: IOrderFormSlice = {
    orderForm: {} as IOrderRequest,
    errors: []
}

const orderFormSlice = createSlice({
    name: 'orderFormSlice',
    initialState,
    reducers: {
        changeOrderForm(state, action: PayloadAction<IOrderRequest>) {
            state.orderForm = {...action.payload};
        },
        initOrderForm(state, action: PayloadAction<IDirection>) {

            if (action.payload?.arrival) {
                state.orderForm.arrival = {
                    route_direction_id: action.payload.arrival._id,
                    seats: []
                }    
            }

            if (action.payload?.departure) {
                state.orderForm.departure = {
                    route_direction_id: action.payload.departure._id,
                    seats: []
                } 
            }

            state.errors = [];
        },
        cleanOrderFormSeatsByDirection(state, action: PayloadAction<boolean>) {
            if (action.payload && state.orderForm.arrival) {
                state.orderForm.arrival.seats = [];
            }

            if (!action.payload && state.orderForm.departure) {
                state.orderForm.departure.seats = [];
            }
            state.errors = [];
        },
        cleanOrderForm(state) {
            state.orderForm.user = null;
            state.orderForm.arrival = null;
            state.orderForm.departure = null;
            state.errors = [];
        },
        setSeats(state, action: PayloadAction<{ isArrival: boolean, seats: ISeatOrder[] }>) {
            if (action.payload.isArrival && state.orderForm.arrival) {
                state.orderForm.arrival.seats = action.payload.seats;
            }

            if (!action.payload.isArrival && state.orderForm.departure) {
                state.orderForm.departure.seats = action.payload.seats;
            }
        },
        setPersonInfo(state, action: PayloadAction<{index: number, personInfo: IPersonInfo}>) {
            if (action.payload.personInfo) {
                if (state.orderForm.arrival) {
                    let seat = state.orderForm.arrival.seats[action.payload.index];
                    seat.is_child = !action.payload.personInfo.is_adult;
                    seat.person_info = {
                        is_adult: action.payload.personInfo.is_adult,
                        first_name: action.payload.personInfo.first_name,
                        last_name: action.payload.personInfo.last_name,
                        patronymic: action.payload.personInfo.patronymic,
                        gender: action.payload.personInfo.gender,
                        birthday: action.payload.personInfo.birthday,
                        document_type: action.payload.personInfo.document_type,
                        document_data: action.payload.personInfo.document_data,
                    };
                }

                if (state.orderForm.departure) {
                    let seat = state.orderForm.departure.seats[action.payload.index];
                    seat.is_child = !action.payload.personInfo.is_adult;
                    seat.person_info = {
                        is_adult: action.payload.personInfo.is_adult,
                        first_name: action.payload.personInfo.first_name,
                        last_name: action.payload.personInfo.last_name,
                        patronymic: action.payload.personInfo.patronymic,
                        gender: action.payload.personInfo.gender,
                        birthday: action.payload.personInfo.birthday,
                        document_type: action.payload.personInfo.document_type,
                        document_data: action.payload.personInfo.document_data,
                    };
                }
            }
            
        },
        setErrors(state, action: PayloadAction<IError[]>) {
            state.errors = action.payload;
        },
        cleanErrors(state) {
            state.errors = [];
        },
        cleanErrorsByIndex(state, action: PayloadAction<number>) {
            state.errors = state.errors.filter(error => error.index !== action.payload);
        }
    }
})

export const { changeOrderForm, cleanOrderForm, initOrderForm, cleanOrderFormSeatsByDirection, setSeats, setPersonInfo, setErrors, cleanErrors, cleanErrorsByIndex } = orderFormSlice.actions;

export default orderFormSlice.reducer;