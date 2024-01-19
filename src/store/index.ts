import { configureStore } from "@reduxjs/toolkit";
import directionReducer from "./directionSlice";
import directionsResponseReducer from './directionsResponseSlice';

const store =  configureStore({
    reducer: {
        direction: directionReducer,
        directionsResponse: directionsResponseReducer
    }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;