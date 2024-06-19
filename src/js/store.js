import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { totalRewardsApi } from './dux/totalRewardsApi.js';
import commentsApi from './dux/commentsService.js';
import parameterSliceReducer, { parameterSlice } from './dux/commentsSlice.js';
import hideDataSliceReducer, { hideDataSlice } from './dux/hideDataSlice.js';

/*
 * Central data storage
 */
const store = configureStore({
  reducer: {
    [totalRewardsApi.reducerPath]: totalRewardsApi.reducer,
    [commentsApi.reducerPath]: commentsApi.reducer,
    [parameterSlice.name]: parameterSliceReducer,
    [hideDataSlice.name]: hideDataSliceReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(totalRewardsApi.middleware, commentsApi.middleware), //intercept action & adds custom logic
});

setupListeners(store.dispatch);

export default store;
