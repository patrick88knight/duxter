import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {user} from "../../../services/User";
import {IUser} from "../../../../../interfaces";
import {toast} from "react-toastify";

export const userFetchUsers = createAsyncThunk(
    "user/fetchUsers",
    (token: string) => user.fetchUsers(token)
)

export const userMy = createAsyncThunk(
    "user/my",
    async (token: string) => user.my(token)
)

export const userLogin = createAsyncThunk(
    "user/login",
    async (userData: IUser, {dispatch}) => {
        const token = await user.login(userData)
        dispatch(userMy(token))
        return token
    }
);

export interface IUserState {
    token: string | null
    allUsers: IUser[]
    username: string | null
    email: string | null
    password: string | null
}

const initialState: IUserState = {
    username: null,
    email: null,
    password: null,
    token: null,
    allUsers: []
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userLogout(state, action: PayloadAction<any>) {
            state.token = null
            state.allUsers = []
            state.username = null
            state.email = null
            state.password = null
        }
    },
    extraReducers: {
        [userLogin.pending.type]: (state, action) => {
        },
        [userLogin.fulfilled.type]: (state, action) => {
            // userSlice.caseReducers.userGetUsersAction(state, action);
            state.token = action.payload
            toast("Token received successfully!")
        },
        [userLogin.rejected.type]: (state, action) => {
            toast("Rejected!")
        },

        [userMy.pending.type]: (state, action) => {
        },
        [userMy.fulfilled.type]: (state, action: { payload: IUser }) => {
            state.username = action.payload.username
            state.email = action.payload.email
            state.password = action.payload.password

            toast("My data received successfully!")
        },
        [userMy.rejected.type]: (state, action) => {
            toast("Rejected!")
        },

        [userFetchUsers.pending.type]: (state, action) => {
        },
        [userFetchUsers.fulfilled.type]: (state, action: { payload: IUser[] }) => {
            state.allUsers = action.payload
            toast("User data received successfully!")
        },
        [userFetchUsers.rejected.type]: (state, action) => {
            toast("Rejected!")
        },
    }
})

export const {userLogout} = userSlice.actions;
export default userSlice.reducer;