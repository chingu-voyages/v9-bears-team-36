import React from "react";

import disasters from "../seedData";

const SearchBar = ({ onChange, onSubmit, value }) => (
  <div>
    <input onChange={onChange} placeholder="Find by Country" value={value} />
    {value && (
      <div>
        {disasters
          .filter(disaster => disaster.name.toLowerCase().includes(value))
          .map(disaster => (
            <button key={disaster.id} onClick={onSubmit} value={disaster.id}>
              {disaster.name}
            </button>
          ))}
      </div>
    )}
  </div>
);

export default SearchBar;
