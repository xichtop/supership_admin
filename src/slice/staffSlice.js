import { createSlice } from '@reduxjs/toolkit';

const initialStaff = {
  staff: {
    StaffId: '',
    Password: '',
    Fullname: '',
    Phone: '',
    Address: '',
  },
  token: '',
};

const staff = createSlice({
  name: 'staff',
  initialState: initialStaff,
  reducers: {
    login: (state, action) => {
      // const newProduct = action.payload;
        return {...action.payload}
    },

    logout: () => {
        // const newProduct = action.payload;
        return initialStaff;
    },
  }
});

// export const { cartReducer } = cart;
const { reducer, actions } = staff;
export const { login,  logout } = actions;
export default reducer;