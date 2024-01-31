import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IDirectionsRequest } from '../interfaces/IDirectionsRequest';

export interface IDirectionSlice {
    directionSearch: IDirectionsRequest
}

const initialState: IDirectionSlice = {
    directionSearch: {} as IDirectionsRequest
}
const directionSearchSlice = createSlice({
    name: "directionSearch",
    initialState, 
    reducers: {
        changeDirectionSearch(state, action: PayloadAction<IDirectionsRequest> ) {
            state.directionSearch = {...action.payload};
        }
    }
})

export const { changeDirectionSearch } = directionSearchSlice.actions;

export default directionSearchSlice.reducer;