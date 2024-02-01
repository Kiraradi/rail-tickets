import { configureStore } from "@reduxjs/toolkit";
import directionSearchSliceReducer from "./directionSearchSlice";
import directionsSliceReducer from './directionsSlice';
import orderFormSliceReducer from "./orderFormSlice";
import stepSlice from "./stepSlice";
import loadingSlice from "./loadingSlice";

const store =  configureStore({
    reducer: {
        directionSearch: directionSearchSliceReducer,
        directions: directionsSliceReducer,
        orderForm: orderFormSliceReducer,
        step: stepSlice,
        loading: loadingSlice
    }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;