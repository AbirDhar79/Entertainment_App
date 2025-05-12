import { createSlice } from "@reduxjs/toolkit";
import { addBookmark, removeBookmark } from "../../firebase-config";

const initialState = {
    bookmark: [],
    searchTermBookmark: "",
    loadingBookmark: true
}

const bookmarkSlice = createSlice({
    name: "bookmark",
    initialState,
    reducers: {
        setBookmark(state, action) {
            state.bookmark = action.payload
        },
        setSearchTermBookmark(state, action) {
            state.searchTermBookmark = action.payload
        },
        setLoadingBookmark(state, action) {
            // return !state;
            state.loadingBookmark = action.payload;
        },
        addBookmarkToStore(state, action) {
            // state.bookmark(action.payload)
            state.bookmark = [...state.bookmark, (action.payload)]
        },
        removeBookmarkFromStore(state, action) {
            state.bookmark = state.bookmark.filter(item => item.id !== action.payload)
        }

    }
})

export default bookmarkSlice.reducer;

export const { setBookmark, setLoadingBookmark, setSearchTermBookmark, addBookmarkToStore, removeBookmarkFromStore } = bookmarkSlice.actions