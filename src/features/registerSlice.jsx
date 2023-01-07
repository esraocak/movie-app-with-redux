import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user:null

}

const registerSlice = createSlice({
  name: user,
  initialState,
  reducers: {
    setUser: (state,action) => {
        state.user = action.payload
    },

  }
});

export const {} = registerSlice.actions

export default registerSlice.reducer