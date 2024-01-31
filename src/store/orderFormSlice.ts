import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IOrderRequest, ISeatOrder } from '../interfaces/IOrderRequest';
import { IDirection } from '../interfaces/IDirectionsResponse';

export interface IOrderFormSlice {
    orderForm: IOrderRequest
}

const initialState: IOrderFormSlice = {
    orderForm: {} as IOrderRequest
}

const orderFormSlice = createSlice({
    name: 'orderFormSlice',
    initialState,
    reducers: {
        changeOrderForm(state, action: PayloadAction<IOrderRequest>) {
            state.orderForm = {...action.payload};
        },
        initOrderForm(state, action: PayloadAction<IDirection>) {

            if (action.payload.arrival) {
                state.orderForm.arrival = {
                    route_direction_id: action.payload.arrival._id,
                    seats: []
                }    
            }

            if (action.payload.departure) {
                state.orderForm.departure = {
                    route_direction_id: action.payload.departure._id,
                    seats: []
                } 
            }
        },
        cleanOrderFormSeatsByDirection(state, action: PayloadAction<boolean>) {
            if (action.payload && state.orderForm.arrival) {
                state.orderForm.arrival.seats = [];
            }

            if (!action.payload && state.orderForm.departure) {
                state.orderForm.departure.seats = [];
            }
        },
        cleanOrderForm(state) {
            state.orderForm.user = null;
            state.orderForm.arrival = null;
            state.orderForm.departure = null;
        },
        setSeats(state, action: PayloadAction<{ isArrival: boolean, seats: ISeatOrder[] }>) {
            if (action.payload.isArrival && state.orderForm.arrival) {
                state.orderForm.arrival.seats = action.payload.seats;
            }

            if (!action.payload.isArrival && state.orderForm.departure) {
                state.orderForm.departure.seats = action.payload.seats;
            }
        }
    }
})

export const { changeOrderForm, cleanOrderForm, initOrderForm, cleanOrderFormSeatsByDirection, setSeats } = orderFormSlice.actions;

export default orderFormSlice.reducer;