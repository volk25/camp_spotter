import { useState } from "react";
import "./SearchBar.css";
import {Link} from "react-router-dom";

const SearchBar = () => {
  const [text, setText] = useState("");

  // useEffect
  // api post request - Fetch
  const postSearch = (searchValue) => {};

  return (
    <div className="search-bar text-center">
      <input
        className="s-bar rounded border-0"
        type="text"
        value={text}
        onChange={(e) => {
          e.preventDefault();
          setText(e.target.value);
        }}
      />
      {/* adding search icon with the link to the map page*/}
      <Link to="/map">
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" className="bi bi-search ms-2" viewBox="0 0 16 16">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
        </svg>
      </Link>
      {/* adding locate me icon with the link to the map page*/}
      <Link to="/map">
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" className="bi bi-cursor-fill ms-3" viewBox="0 0 16 16">
          <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z"/>
        </svg>
      </Link>
    
    </div>
  );
};

export default SearchBar;
