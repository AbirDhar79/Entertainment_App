// import React, { useEffect, useState } from "react";
// import searchIcon from "../assets/header-assets/search.svg";

// const SearchBar = ({ searchTerm, setSearchTerm, placeholder }) => {

//   const [input, setInput] = useState(searchTerm)

//   const handleSearch = (e) => {
//     setInput(e.target.value)
//   };

//   //for debouncing
//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       setSearchTerm(input);
//     }, 1000);
//     // Cleanup function to clear timeout on unmount or searchTerm change
//     return () => clearTimeout(timeout);
//   }, [input]); // Only run effect when input changes

//   return (
//     <form className="relative pt-24 w-full lg:pt-16" onSubmit={(e) => e.preventDefault()}>
//       <label htmlFor="search">
//         <img
//           src={searchIcon}
//           alt="Search Icon"
//           className="absolute cursor-pointer "
//         />
//       </label>
//       <input
//         onChange={handleSearch}
//         value={input}
//         type="search"
//         id="search"
//         placeholder={placeholder}
//         className="w-2/3  caret-redColor  pl-8 pb-3 bg-transparent border-0 outline-none text-white font-light focus:border-b focus:border-b-[#5A698F]"
//       />
//     </form>
//   );
// };

// export default SearchBar;
import React, { useEffect, useState } from "react";
import searchIcon from "../assets/header-assets/search.svg";

const SearchBar = ({ searchTerm, setSearchTerm, placeholder }) => {
  const [input, setInput] = useState(searchTerm || "");

  const handleSearch = (e) => {
    setInput(e.target.value);
  };

  //for debouncing
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (typeof setSearchTerm === "function") {
        setSearchTerm(input);
      } else {
        console.warn("setSearchTerm is not a function:", setSearchTerm);
      }
    }, 1000);
    return () => clearTimeout(timeout);
  }, [input, setSearchTerm]);

  return (
    <form className="relative pt-24 w-full lg:pt-16" onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="search">
        <img
          src={searchIcon}
          alt="Search Icon"
          className="absolute cursor-pointer "
        />
      </label>
      <input
        onChange={handleSearch}
        value={input}
        type="search"
        id="search"
        placeholder={placeholder}
        className="w-2/3  caret-redColor  pl-8 pb-3 bg-transparent border-0 outline-none text-white font-light focus:border-b focus:border-b-[#5A698F]"
      />
    </form>
  );
};

export default SearchBar;