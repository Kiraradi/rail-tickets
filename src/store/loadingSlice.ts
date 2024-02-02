import { createSlice } from '@reduxjs/toolkit';

export interface IStepSlice {
    loading: boolean
}

const initialState: IStepSlice = {
    loading: true
}
const loadingSlice = createSlice({
    name: "loading",
    initialState, 
    reducers: {
        stopLoading(state) {
            state.loading = false;
        },
        startLoading(state) {
            state.loading = true;
        }
    }
})

export const { stopLoading, startLoading } = loadingSlice.actions;

export default loadingSlice.reducer;