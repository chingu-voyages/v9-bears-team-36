import React from 'react';

import './SearchBar.scss';

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
    <div className="search-bar__container">
      <div className="search-bar__bar">
        <input
          className="search-bar__input"
          disabled={disabled}
          onChange={onChange}
          placeholder={disabled ? '' : 'Find by Country'}
          value={value}
        />
        {selectedCountry && (
          <p className="search-bar__country">
            {selectedCountry.name}
            <button className="search-bar__reset" onClick={onReset}>
              ×
            </button>
          </p>
        )}
        {value && (
          <div className="search-bar__results-list">
            {matches.length > 0 ? (
              matches
                .sort(
                  (a, b) =>
                    a.name.toLowerCase().indexOf(value.trim()) >
                    b.name.toLowerCase().indexOf(value.trim())
                )
                .map(country => (
                  <button
                    className="results-list__item--link"
                    key={country.id}
                    onClick={onSubmit}
                    value={country.id}
                  >
                    {country.name}
                  </button>
                ))
            ) : (
              <p className="results-list__item">No disasters found</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
