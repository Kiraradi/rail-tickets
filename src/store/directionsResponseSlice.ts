import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IDirectionsResponse } from '../interfaces/IDirectionsResponse';

export interface IDirectionsResponseSlice {
    directionsResponse : IDirectionsResponse
}

const initialState: IDirectionsResponseSlice = {
    directionsResponse: {} as IDirectionsResponse
}

const directionsResponse = createSlice({
    name: 'directionsResponse',
    initialState,
    reducers: {
        ChangeDirectionsResponse(state, action: PayloadAction<IDirectionsResponse>) {
            state.directionsResponse = {...action.payload};
        }
    }
})

export const {ChangeDirectionsResponse} = directionsResponse.actions;

export default directionsResponse.reducer;