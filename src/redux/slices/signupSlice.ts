import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pageState: 'create', // "create" or "verify"
}

const signupSlice = createSlice({
  name: "signupState",
  initialState,
  reducers: {
    setPageState(state, action) {
      state.pageState = action.payload;
    }
  }
})

export const { setPageState } = signupSlice.actions;
export default signupSlice.reducer;
