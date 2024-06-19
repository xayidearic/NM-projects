import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  articleId: '',
  pageTitle: '',
  orderBy: 0,
  openModal: false,
  articleCommentCount: 0,
};

export const parameterSlice = createSlice({
  name: 'parameters',
  initialState,
  reducers: {
    setParams: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { setParams } = parameterSlice.actions;
export const selectParams = (state) => state.parameters;
export default parameterSlice.reducer;
