import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    hideCompData: true,
    hideFSData: true,
    hideHCData: true,
    hideDashboardData: true,
}

export const hideDataSlice = createSlice({
    name: 'hideData',
    initialState,
    reducers: {
        setHideData: (state, action) => {
            return {
                ...state,
                ...action.payload,
            };
        },
    },
});

export const { setHideData } = hideDataSlice.actions;
export const selectHideData = (state) => state.hideData;
export default hideDataSlice.reducer;