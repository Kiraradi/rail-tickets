import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IDirectionsRequest } from '../interfaces/IDirectionsRequest';

export interface IDirectionSlice {
    direction: IDirectionsRequest
}
const initialState: IDirectionSlice = {
    direction: {} as IDirectionsRequest
}
const directionSlice = createSlice({
    name: "direction",
    initialState, 
    reducers: {
        changeDirection(state, action: PayloadAction<IDirectionsRequest> ) {
            state.direction = {...action.payload};
        }
    }
})

export const { changeDirection } = directionSlice.actions;

export default directionSlice.reducer;