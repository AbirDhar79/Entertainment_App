import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchResults: [],
    searchTerm: "",
    loadingSearchResults: true
}

const searchResultsSlice = createSlice({
    name: "searchResults",
    initialState,
    reducers: {
        setSearchResults(state, action) {
            state.searchResults = action.payload
        },
        setSearchTerm(state, action) {
            state.searchTerm = action.payload
        },
        setLoadingSearchResults(state, action) {
            // return !state;
            state.loadingSearchResults = action.payload;
        },

    }
})

export default searchResultsSlice.reducer;

export const { setSearchResults, setLoadingSearchResults, setSearchTerm } = searchResultsSlice.actions