import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: false,  // Disable immutable state check
            serializableCheck: false, // Optionally disable serializable state check for better performance
        }),
});

export default store;