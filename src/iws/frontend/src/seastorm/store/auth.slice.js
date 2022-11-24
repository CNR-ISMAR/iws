const { createSlice, createSelector } = require("@reduxjs/toolkit");

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
    },
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
        },
    },
})

export const authSelectors = {
    isAuthenticated: createSelector(
        state => state[authSlice.name],
        ({ user }) => !!user,
    ),
    user: createSelector(
        state => state[authSlice.name],
        state => state.user,
    ),
}

export const authActions = authSlice.actions;
