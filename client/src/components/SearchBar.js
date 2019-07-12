import React from 'react';

const SearchBar = ({
  countries,
  disabled,
  onChange,
  onReset,
  onSubmit,
  value
}) => {
  const matches = countries.filter(country =>
    country.name.toLowerCase().includes(value.trim())
  );
  return (
    <div>
      <input
        disabled={disabled}
        onChange={onChange}
        placeholder="Find by Country"
        value={value}
      />
      <button onClick={onReset}>View All</button>
      {value && (
        <div>
          {matches.length > 0 ? (
            matches
              .sort(
                (a, b) =>
                  a.name.toLowerCase().indexOf(value.trim()) >
                  b.name.toLowerCase().indexOf(value.trim())
              )
              .map(country => (
                <button key={country.id} onClick={onSubmit} value={country.id}>
                  {country.name}
                </button>
              ))
          ) : (
            <div>No disasters found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
