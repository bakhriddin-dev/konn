import { apiSlice, authSliceReducer } from "@/features";
import { uiReducer } from "@/features/ui-slice/ui-slice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSliceReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
