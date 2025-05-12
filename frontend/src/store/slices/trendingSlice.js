import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    trending: [],
    loadingTrending: true
}

const trendingSlice = createSlice({
    name: "trending",
    initialState,
    reducers: {
        setTrending(state, action) {
            state.trending = action.payload
        },
        setLoadingTrending(state, action) {
            // return !state;
            state.loadingTrending = action.payload;
        },

    }
})

export default trendingSlice.reducer;

export const { setTrending, setLoadingTrending } = trendingSlice.actions