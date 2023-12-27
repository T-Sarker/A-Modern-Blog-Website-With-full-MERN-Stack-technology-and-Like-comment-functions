import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { registerService, loginService } from "./authService";

const currentUser = JSON.parse(localStorage.getItem('userData'))

const initialState = {
    user: currentUser ? currentUser : null,
    success: null,
    error: '',
    isLoading: false


}


export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
    try {
        const result = await registerService(user)
        localStorage.setItem("userData", JSON.stringify(result.data))
        return result.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
        console.log("here" + error);
    }
})

export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    try {

        const result = await loginService(user)
        localStorage.setItem("userData", JSON.stringify(result.data))
        return result.data

    } catch (error) {

        console.log("error ge" + error)
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.user = currentUser
            state.success = null
            state.error = ''
            state.isLoading = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {

                state.success = true
                state.user = action.payload
            })
            .addCase(register.rejected, (state, action) => {

                state.error = action.payload.message
            })

            .addCase(login.pending, (state, action) => {
                state.isLoading = true
            })

            .addCase(login.fulfilled, (state, action) => {

                state.success = true
                state.user = action.payload
            })
            .addCase(login.rejected, (state, action) => {

                state.error = action.payload.message
            })
    }
})

export const { reset } = authSlice.actions

export default authSlice.reducer
