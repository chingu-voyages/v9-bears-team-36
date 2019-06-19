import React from 'react';

class SearchResult extends React.Component {
  state = {};

  render() {
    const { disasters, onClick, searchResult } = this.props;
    return (
      <div>
        {disasters
          .filter(disaster =>
            disaster.countries.find(
              country => country.name === searchResult.name
            )
              ? true
              : false
          )
          .map(disaster => (
            <button key={disaster.id} onClick={onClick} value={disaster.id}>
              {disaster.name}
            </button>
          ))}
      </div>
    );
  }
}

export default SearchResult;
