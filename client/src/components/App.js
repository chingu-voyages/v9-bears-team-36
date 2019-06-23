import React from 'react';
import axios from 'axios';

import './App.scss';
import SearchBar from './SearchBar';
import DisastersList from './DisastersList';
import SearchResult from './SearchResult';
import DisasterPageWrapper from './DisasterPageWrapper';
import HomeMap from './HomeMap';

require('dotenv').config();

class App extends React.Component {
  state = {
    countries: [],
    disasters: [],
    disaster: null,
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

  handleSetDisaster = e => {
    const disasterId = e.target.value;

    const disaster = this.state.disasters.find(
      disaster => disaster.id === Number(disasterId)
    );

    this.setState(() => ({
      disaster
    }));
  };

  handleClearDisaster = () => {
    this.setState(() => ({
      disaster: null
    }));
  };

  render() {
    return (
      <div className="App">
        {this.state.disaster ? (
          <DisasterPageWrapper
            disaster={this.state.disaster}
            onClick={this.handleClearDisaster}
          />
        ) : (
          <div>
            <h1>Ongoing Disasters</h1>
            <SearchBar
              countries={this.state.countries}
              onChange={this.onSearchChange}
              onReset={this.onReset}
              onSubmit={this.onSearchSubmit}
              value={this.state.search}
            />
            <HomeMap data={this.state.disasters} />
            {this.state.searchResult && (
              <p>Showing results for {this.state.searchResult.name}</p>
            )}
            {!this.state.searchResult ? (
              <DisastersList disasters={this.state.disasters} />
            ) : (
              <SearchResult
                disasters={this.state.disasters}
                onClick={this.handleSetDisaster}
                searchResult={this.state.searchResult}
              />
            )}
          </div>
        )}
      </div>
    );
  }
}

export default App;
