const { createSlice, createSelector } = require("@reduxjs/toolkit");

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        ready: false,
    },
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
            state.ready = true;
        },
    },
})

export const authSelectors = {
    isAuthenticated: createSelector(
        state => state[authSlice.name],
        ({ user }) => !!user,
    ),
    isReady: createSelector(
        state => state[authSlice.name],
        ({ ready }) => ready,
    ),
    user: createSelector(
        state => state[authSlice.name],
        state => state.user,
    ),
}

export const authActions = authSlice.actions;
