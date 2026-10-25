import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { authApi } from '@features/Auth/api/authApi'

import { userReducer } from '@entities/User/model/userSlice'

import { errorMiddleware } from '@shared/middleware/errorMiddleware'
import { loggerMiddleware } from '@shared/middleware/loggerMiddleware'
import { apiSlice } from '@shared/services/apiSlice'

void authApi

const persistConfig = {
	key: 'user',
	storage,
}

const persistedUserReducer = persistReducer(persistConfig, userReducer)

export const store = configureStore({
	reducer: {
		user: persistedUserReducer,
		[apiSlice.reducerPath]: apiSlice.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		})
			.concat(apiSlice.middleware)
			.concat(errorMiddleware)
			.concat(loggerMiddleware),
	devTools: import.meta.env.DEV,
})

export const persistor = persistStore(store)

setupListeners(store.dispatch)
