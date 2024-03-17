import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  list: [],
  loading: false
}

export const burgerSlice = createSlice({
  name: 'burgers',
  initialState,
  reducers: {
    setBurgerData: (state, action) => {
      state.list = [...state.list, ...action.payload];
        state.loading = false; 
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
  },
}})

import { localRequest } from '../../utils/axios'

export const { setBurgerData, setLoading } = burgerSlice.actions

export const getBurgers = () => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await localRequest.get(`/burgers`);
      console.log(response);
      dispatch(setBurgerData(response.data))
  } catch (error) {
      console.error(error);
  } finally {
    dispatch(setLoading(false));
  }
  } 
}

// Action creators are generated for each case reducer function


export default burgerSlice.reducer