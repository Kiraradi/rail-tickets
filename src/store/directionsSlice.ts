import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IDirectionsResponse, IDirection } from '../interfaces/IDirectionsResponse';

export interface IDirectionsSlice {
    directions : IDirectionsResponse
}

const initialState: IDirectionsSlice = {
    directions: {
        total_count: 0,
        items: [] as IDirection[],
        error: null
    } as IDirectionsResponse
}

const directionsSlice = createSlice({
    name: 'directionsResponse',
    initialState,
    reducers: {
        changeDirections(state, action: PayloadAction<IDirectionsResponse>) {
            state.directions = {...action.payload};
        },
        initDirections(state) {
            state.directions = {
                total_count: 0,
                items: [],
                error: null
            };
        }
    }
})

export const { changeDirections, initDirections } = directionsSlice.actions;

export default directionsSlice.reducer;