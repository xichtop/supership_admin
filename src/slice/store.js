import { configureStore } from "@reduxjs/toolkit";
import  staffReducer  from './staffSlice';


const rootReducer = {
  staff: staffReducer,
}

const store = configureStore({
    reducer: rootReducer,
});


export default store;