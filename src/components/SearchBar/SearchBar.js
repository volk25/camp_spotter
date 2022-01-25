import { useState } from "react";
import "./SearchBar.css";

const SearchBar = () => {
  const [text, setText] = useState("");

  // useEffect
  // api post request - Fetch
  const postSearch = (searchValue) => {};

  return (
    <div className="search-bar">
      <input
        className="s-bar"
        type="text"
        value={text}
        onChange={(e) => {
          e.preventDefault();
          setText(e.target.value);
        }}
      />
      <button className="s-button" onClick={postSearch}>
        <i class="fas fa-location-arrow"></i>
      </button>
      <p>{text}</p>
    </div>
  );
};

export default SearchBar;
