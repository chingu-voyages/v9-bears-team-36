import React from 'react';
import axios from 'axios';

import SearchBar from './SearchBar';

class App extends React.Component {
  state = {
    countries: [],
    disasters: [],
    search: '',
    searchResult: ''
  };

  async componentDidMount() {
    const res = await axios.get('/relief');
    const disasters = res.data;

    const countries = [];
    disasters.forEach(disaster =>
      disaster.countries.forEach(country => {
        if (!countries.map(country => country.name).includes(country.name)) {
          countries.push({
            id: country.id,
            location: {
              lat: country.location.lat,
              lon: country.location.lon
            },
            name: country.name
          });
        }
      })
    );

    this.setState(() => ({ countries, disasters }));
  }

  onSearchChange = e => {
    const search = e.target.value;

    this.setState(() => ({ search: search.toLowerCase() }));
  };

  onSearchSubmit = e => {
    e.preventDefault();

    const searchId = Number(e.target.value);
    const searchResult = this.state.countries.find(
      country => country.id === searchId
    );

    this.setState(() => ({
      search: '',
      searchResult
    }));
  };

  onReset = e => {
    e.preventDefault();

    this.setState(() => ({ search: '', searchResult: '' }));
  };

  renderList = () => (
    <ul>
      {this.state.disasters.map(disaster => (
        <li key={disaster.id}>{disaster.name}</li>
      ))}
    </ul>
  );

  renderResult = () => (
    <div>
      {this.state.disasters
        .filter(disaster =>
          disaster.countries.find(
            country => country.name === this.state.searchResult.name
          )
            ? true
            : false
        )
        .map(disaster => (
          <p key={disaster.id}>{disaster.name}</p>
        ))}
    </div>
  );

  render() {
    return (
      <div className="App">
        <h1>Ongoing Disasters</h1>
        <SearchBar
          countries={this.state.countries}
          onChange={this.onSearchChange}
          onReset={this.onReset}
          onSubmit={this.onSearchSubmit}
          value={this.state.search}
        />
        {this.state.searchResult && (
          <p>Showing results for {this.state.searchResult.name}</p>
        )}
        {!this.state.searchResult ? this.renderList() : this.renderResult()}
      </div>
    );
  }
}

export default App;
