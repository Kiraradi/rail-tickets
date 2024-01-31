import { configureStore } from "@reduxjs/toolkit";
import directionReducer from "./directionSlice";
import directionsResponseReducer from './directionsResponseSlice';
import trainFormReducer from "./trainForm";

const store =  configureStore({
    reducer: {
        direction: directionReducer,
        directionsResponse: directionsResponseReducer,
        trainForm: trainFormReducer
    }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;