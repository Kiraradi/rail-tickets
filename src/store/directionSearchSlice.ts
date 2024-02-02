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
        },
        initDirectionSearch(state) {
            state.directionSearch = {
                from_city_id: '',
                to_city_id: ''
            }
        }
    }
})

export const { changeDirectionSearch, initDirectionSearch } = directionSearchSlice.actions;

export default directionSearchSlice.reducer;