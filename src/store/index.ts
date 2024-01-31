import { configureStore } from "@reduxjs/toolkit";
import directionSearchSliceReducer from "./directionSearchSlice";
import directionsSliceReducer from './directionsSlice';
import orderFormSliceReducer from "./orderFormSlice";

const store =  configureStore({
    reducer: {
        directionSearch: directionSearchSliceReducer,
        directions: directionsSliceReducer,
        orderForm: orderFormSliceReducer
    }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;