import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';

import { baseApi } from '@api/base.api';

import { combineReducers } from '@reduxjs/toolkit';
import persistStore from 'redux-persist/es/persistStore';
import { languageSlice } from '@features/configs/configuration.slice';


const reducer = combineReducers({
    [baseApi.reducerPath]: baseApi.reducer,
    [languageSlice.name]: languageSlice.reducer,
});

const persistConfig = {
    key: 'oneDiscovery-test',
    whitelist: [],
    storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>

export const persistor = persistStore(store);
