import { configureStore } from "@reduxjs/toolkit";
import directionReducer from "./directionSlice";

const store =  configureStore({
    reducer: {
        direction: directionReducer,
    }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;