import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "./EmployeeReducer";
import { persistStore , persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";

const persistConfig = {
    key: "root",
    storage,
}

const persistedReducer = persistReducer(persistConfig, employeeReducer)

const store = configureStore({
    reducer: persistedReducer,
})

export default store
export const persistor = persistStore(store) 
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch