import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IArrivalAndDeparture } from '../interfaces/IDirectionsResponse';

interface IDirectionInfo {
    directioninfo: IArrivalAndDeparture
    seats: number[]
    sum: number
}
export interface ITrainForm {
    status: boolean
    directionArrivalInfo:IDirectionInfo
    directionDepartureInfo: IDirectionInfo
}

const initialState: ITrainForm = {
    status: false,
    directionArrivalInfo: {
        directioninfo: {} as IArrivalAndDeparture,
        seats: [],
        sum: 0
    } ,
    directionDepartureInfo: {
        directioninfo: {} as IArrivalAndDeparture,
        seats: [],
        sum: 0
    } 
}
    


const trainForm = createSlice({
    name: 'trainForm',
    initialState,
    reducers: {
        ChangeTrainForm(state, action: PayloadAction<ITrainForm>) {
            const newState = {...action.payload};

            if (Object.keys(newState.directionArrivalInfo.directioninfo).length 
                && Object.keys(newState.directionDepartureInfo.directioninfo).length
                && newState.directionArrivalInfo.seats.length
                && newState.directionArrivalInfo.sum > 0
                && newState.directionDepartureInfo.seats.length
                && newState.directionDepartureInfo.sum > 0 ) 
            {
                newState.status = true;
            } else {
                newState.status = false;
            }

            state = newState;
        }
    }
})

export const {ChangeTrainForm} = trainForm.actions;

export default trainForm.reducer;