import React from 'react';

const SearchBar = ({ countries, onChange, onReset, onSubmit, value }) => (
  <div>
    <input onChange={onChange} placeholder="Find by Country" value={value} />
    <button onClick={onReset}>View All</button>
    {value && (
      <div>
        {countries
          .filter(country => country.name.toLowerCase().includes(value))
          .sort(
            (a, b) =>
              a.name.toLowerCase().indexOf(value) >
              b.name.toLowerCase().indexOf(value)
          )
          .map(country => (
            <button key={country} onClick={onSubmit} value={country.id}>
              {country.name}
            </button>
          ))}
      </div>
    )}
  </div>
);

export default SearchBar;
