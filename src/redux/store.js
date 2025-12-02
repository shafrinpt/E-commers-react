import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; 
import { combineReducers } from "@reduxjs/toolkit";

// Combine reducers
const rootReducer = combineReducers({
  cart: cartReducer,
});

// Persist configuration
const persistConfig = {
  key: "root",
  storage,
};

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store (FIXED: disable serializable checks)
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // 🔥 FIXES THE ERROR
    }),
});

// Persistor
export const persistor = persistStore(store);
