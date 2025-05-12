import { useDispatch, useSelector } from "react-redux";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { addBookmark, removeBookmark } from "../../firebase-config";
import { addBookmarkToStore, removeBookmarkFromStore } from "../../store/slices/bookmarkSlice";


const BookmarkBtn = ({ movie, mediaType }) => {

    const { bookmark } = useSelector(state => state.bookmarkSlice)
    const dispatch = useDispatch()

    const addedBookmarked = bookmark?.find(e => e.id === movie?.id)
    // const addedBookmarked = false
    // console.log(mediaType);


    const handleBookmark = async (e) => {
        e.preventDefault()
        if (addedBookmarked) {
            removeBookmark(movie.id, mediaType)
            dispatch(removeBookmarkFromStore(movie.id))
        } else {
            addBookmark(movie.id, mediaType)   //adding bookmark to database
            dispatch(addBookmarkToStore(movie))  //adding bookmark to local redux store
        }
    }


    return (
        <i className="absolute top-2 right-2 cursor-pointer bookmark-icon z-50 "
            onClick={handleBookmark}>
            {
                (addedBookmarked) ? <FaBookmark color="#007BFF" /> : <FaRegBookmark />
            }

        </i>
    )
}

export default BookmarkBtn