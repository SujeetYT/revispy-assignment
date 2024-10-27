import { configureStore } from "@reduxjs/toolkit";
import signupSlice from "./slices/signupSlice";

const store = configureStore({
  reducer: {
    signupState: signupSlice,
  },
})

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch