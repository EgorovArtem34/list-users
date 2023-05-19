/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

type User = {
  id: number,
  name: string,
  username: string,
  email: string,
  address: {
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    geo: {
      lat: string,
      lng: string
    }
  },
  phone: string,
  website: string,
  company: {
    name: string,
    catchPhrase: string,
    bs: string
  }
}

type usersState = {
  users: User[],
  activeUser: {
    id: number | null,
    isReadOnly: boolean,
  },
  error: string | null,
  isLoading: boolean;
}

export const fetchUsers = createAsyncThunk<User[], undefined, { rejectValue: string }>(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    const url = 'https://jsonplaceholder.typicode.com/users';
    const response = await fetch(url);
    if (!response.ok) {
      return rejectWithValue(`error, status ${response.status}`);
    }
    const users = await response.json();
    return users;
  }
)

const initialState: usersState = {
  users: [],
  activeUser: {
    id: null,
    isReadOnly: true,
  },
  error: null,
  isLoading: false
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(fetchUsers.rejected, (state, { payload }: PayloadAction<any>) => {
        state.error = payload;
        state.isLoading = false;
      })
      .addCase(fetchUsers.fulfilled, (state, { payload }) => {
        state.error = null;
        state.users = payload;
        state.isLoading = false;
      });
  }
})


export default usersSlice.reducer;
