import { configureStore } from "@reduxjs/toolkit";
import moviesSlice from "./slices/moviesSlice";
import seriesSlice from "./slices/seriesSlice";
import trendingSlice from "./slices/trendingSlice";
import searchResultsSlice from "./slices/searchResultsSlice";
import recommendedSlice from "./slices/recommendedSlice";
import bookmarkSlice from "./slices/bookmarkSlice";


const store = configureStore({
    reducer: {
        searchResultsSlice,
        moviesSlice,
        seriesSlice,
        recommendedSlice,
        trendingSlice,
        bookmarkSlice,
    }
})

export default store;