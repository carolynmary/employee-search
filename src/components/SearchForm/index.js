import React from "react";
import "./style.css";

function SearchForm(props) {
  return (
    <form className="search" autoComplete="off">
      <div className="form-group">
        <input
          value={props.searchTerm}
          onChange={props.handleInputChange}
          type="text"
          className="form-control"
          placeholder="Type a name to begin"
          id="employee"
        />
      </div>
    </form>
  );
}

export default SearchForm;
