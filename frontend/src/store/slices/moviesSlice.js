import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    movies: [],
    searchTermMovies: "",
    loadingMovies: true
}

const moviesSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        setMovies(state, action) {
            state.movies = action.payload
        },
        setSearchTermMovies(state, action) {
            state.searchTermMovies = action.payload
        },
        setLoadingMovies(state, action) {
            // return !state;
            state.loadingMovies = action.payload;
        },

    }
})

export default moviesSlice.reducer;

export const { setMovies, setLoadingMovies, setSearchTermMovies } = moviesSlice.actions