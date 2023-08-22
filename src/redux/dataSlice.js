import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  input1: [],
  input2: [],
  input3: [],
};

export const dataSlice = createSlice({
  name: "dataExcelJSON",
  initialState,
  reducers: {
    addData: (state, action) => {
      console.log(state, action.payload);

      const {fileName, jsonObject} = action.payload
      state[fileName] = jsonObject;
    },
  },
});

export const { addData } = dataSlice.actions;
export default dataSlice.reducer;
