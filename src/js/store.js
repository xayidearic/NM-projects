import { configureStore } from '@reduxjs/toolkit'; 
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { totalRewardsApi } from './dux/totalRewardsApi.js';
import commentsApi from './dux/commentsService.js';
import parameterSliceReducer from './dux/commentsSlice.js';

/*
 * Central data storage
 */
const store = configureStore({
    reducer: {
        [totalRewardsApi.reducerPath]: totalRewardsApi.reducer,
        [commentsApi.reducerPath]: commentsApi.reducer,
        parameters: parameterSliceReducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(totalRewardsApi.middleware, commentsApi.middleware), //intercept action & adds custom logic
});

setupListeners(store.dispatch);

export default store;