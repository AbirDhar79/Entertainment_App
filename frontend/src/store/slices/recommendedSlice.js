import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    recommended: [],
    loadingRecommended: true
}

const recommendedSlice = createSlice({
    name: "recommended",
    initialState,
    reducers: {
        setRecommended(state, action) {
            state.recommended = action.payload
        },
        setLoadingRecommended(state, action) {
            // return !state;
            state.loadingRecommended = action.payload;
        },

    }
})

export default recommendedSlice.reducer;

export const { setRecommended, setLoadingRecommended } = recommendedSlice.actions