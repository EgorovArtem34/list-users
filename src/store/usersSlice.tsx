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
};

type UsersState = {
  users: User[],
  activeUser: {
    id: number | null,
    isReadOnly: boolean,
  },
  error: string | null,
  isLoading: boolean;
};

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
  },
);

const initialState: UsersState = {
  users: [],
  activeUser: {
    id: null,
    isReadOnly: true,
  },
  error: null,
  isLoading: false,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setActiveUser(state, { payload }: PayloadAction<null | number>) {
      state.activeUser.id = payload;
    },
    toggleReadOnly(state, { payload }: PayloadAction<boolean>) {
      state.activeUser.isReadOnly = payload;
    },
    unsetActiveUser(state) {
      state.activeUser.id = null;
      state.activeUser.isReadOnly = true;
    },
    setEmptyUsers(state) {
      state.users = [];
    },
    sortByCity(state) {
      state.users = state.users.sort((user1, user2) => (user1.address.city > user2.address.city
        ? 1 : -1));
    },
    sortByCompany(state) {
      state.users = state.users.sort((user1, user2) => (user1.company.name > user2.company.name
        ? 1 : -1));
    },
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
  },
});

export const {
  setActiveUser,
  toggleReadOnly,
  unsetActiveUser,
  setEmptyUsers,
  sortByCity,
  sortByCompany,
} = usersSlice.actions;
export default usersSlice.reducer;
