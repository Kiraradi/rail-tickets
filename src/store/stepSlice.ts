import { createSlice } from '@reduxjs/toolkit';

export interface IStepSlice {
    step: number
}

const initialState: IStepSlice = {
    step: -1
}
const stepSlice = createSlice({
    name: "step",
    initialState, 
    reducers: {
        goAhead(state) {
            state.step++;
        },
        goPreviousStep(state) {
            state.step--;
        },
        init(state) {
            state.step = -1;
        },
        goToFirstPage(state) {
            state.step = 0;
        }
    }
})

export const { goAhead, goPreviousStep, init, goToFirstPage } = stepSlice.actions;

export default stepSlice.reducer;