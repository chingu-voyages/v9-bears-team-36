import React from "react";

import disasters from "../seedData";

const SearchBar = ({ onChange, onReset, onSubmit, value }) => (
  <div>
    <input onChange={onChange} placeholder="Find by Country" value={value} />
    <button onClick={onReset}>View All</button>
    {value && (
      <div>
        {disasters
          .filter(disaster => disaster.name.toLowerCase().includes(value))
          .sort(
            (a, b) =>
              a.name.toLowerCase().indexOf(value) >
              b.name.toLowerCase().indexOf(value)
          )
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
