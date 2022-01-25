import { configureStore } from "@reduxjs/toolkit";
import adressesSlice from "./adressesSlice";
import switcherSlice from "./switcherSlice";
//create store multiple reducers
const store = configureStore({
  reducer: { adresses: adressesSlice.reducer, switcher: switcherSlice.reducer },
});

export default store;
