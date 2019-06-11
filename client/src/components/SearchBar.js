import React from "react";

const SearchBar = ({ countries, onChange, onReset, onSubmit, value }) => (
  <div>
    <input onChange={onChange} placeholder="Find by Country" value={value} />
    <button onClick={onReset}>View All</button>
    {value && (
      <div>
        {countries
          .filter(country => country.toLowerCase().includes(value))
          .sort(
            (a, b) =>
              a.toLowerCase().indexOf(value) > b.toLowerCase().indexOf(value)
          )
          .map(country => (
            <button key={country} onClick={onSubmit} value={country}>
              {country}
            </button>
          ))}
      </div>
    )}
  </div>
);

export default SearchBar;
