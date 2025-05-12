import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    series: [],
    searchTermSeries: "",
    loadingSeries: true
}

const seriesSlice = createSlice({
    name: "series",
    initialState,
    reducers: {
        setSeries(state, action) {
            state.series = action.payload
        },
        setSearchTermSeries(state, action) {
            state.searchTermSeries = action.payload
        },
        setLoadingSeries(state, action) {
            // return !state;
            state.loadingSeries = action.payload;
        },

    }
})

export default seriesSlice.reducer;

export const { setSeries, setLoadingSeries, setSearchTermSeries } = seriesSlice.actions