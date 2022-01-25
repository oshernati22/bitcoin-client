import { createSlice } from "@reduxjs/toolkit";

//mange adress use redux toolkit
const adressesSlice = createSlice({
  name: "adresses",
  initialState: {
    timeInterval: 5,
    initial: true,
    data: [],
  },
  reducers: {
    addAdressesData(state, action) {
      state.data.push(action.payload);
    },
    addInitail(state, action) {
      state.initial = action.payload;
    },
    addInterval(state, action) {
      state.timeInterval = action.payload;
    },
    changeData(state, action) {
      state.data = action.payload;
    },
    updateData(state, action) {
      const [newData, oldData] = action.payload;
      state.data = state.data.filter((adress) => {
        return !(adress.ip === oldData.address && adress.port === oldData.port);
      });
      state.data.push({ ip: newData.address, port: newData.port });
    },
  },
});

export const adressesActions = adressesSlice.actions;
export default adressesSlice;
