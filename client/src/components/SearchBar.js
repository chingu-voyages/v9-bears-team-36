import React from 'react';

const SearchBar = ({
  countries,
  disabled,
  onChange,
  onReset,
  onSubmit,
  selectedCountry,
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
      {selectedCountry && (
        <p>
          {selectedCountry.name}
          <button onClick={onReset}>×</button>
        </p>
      )}
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
