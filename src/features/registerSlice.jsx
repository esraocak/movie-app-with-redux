import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentUser:null

}

const registerSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    setCurrentUser: (state,action) => {
        state.currentUser = action.payload;
      
    },
  
  }
});

export const {setCurrentUser} = registerSlice.actions

export default registerSlice.reducer