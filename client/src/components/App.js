import React from 'react';
import axios from 'axios';

import './App.scss';
import SearchBar from './SearchBar';
import DisasterPageWrapper from './DisasterPageWrapper';
import HomeMap from './HomeMap';

require('dotenv').config();

class App extends React.Component {
  state = {
    countries: [],
    disasters: [],
    disaster: null,
    disastersSearchList: [],
    search: '',
    searchResult: null
  };

  async getAllDisasters() {
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
              lng: country.location.lng
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

  updateDisastersSearchList = () => {
    const disasterSearchResults = this.state.disasters.filter(disaster =>
      disaster.countries.find(
        country => country.name === this.state.searchResult.name
      )
        ? true
        : false
    );

    this.setState(() => ({
      disastersSearchList: disasterSearchResults
    }));
  };

  onSearchSubmit = e => {
    e.preventDefault();

    const searchId = Number(e.target.value);
    const searchResult = this.state.countries.find(
      country => country.id === searchId
    );

    this.setState(
      () => ({
        search: '',
        searchResult
      }),
      () => this.updateDisastersSearchList()
    );
  };

  onReset = e => {
    e.preventDefault();

    this.setState(
      () => ({ search: '', searchResult: null, disastersSearchList: [] }),
      () => this.getAllDisasters()
    );
  };

  handleSetDisaster = disasterId => {
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

  componentDidMount() {
    this.getAllDisasters();
  }

  render() {
    const {
      countries,
      disaster,
      disasters,
      disastersSearchList,
      search,
      searchResult
    } = this.state;

    return (
      <div className="App">
        {disaster ? (
          <DisasterPageWrapper
            disaster={disaster}
            onClick={this.handleClearDisaster}
          />
        ) : (
          <div>
            <h1>Ongoing Disasters</h1>
            <SearchBar
              countries={countries}
              onChange={this.onSearchChange}
              onReset={this.onReset}
              onSubmit={this.onSearchSubmit}
              value={search}
            />
            {searchResult && <p>Showing results for {searchResult.name}</p>}
            <HomeMap
              data={disasters}
              searchList={disastersSearchList}
              searchResult={searchResult}
              handleSetDisaster={this.handleSetDisaster}
            />
          </div>
        )}
      </div>
    );
  }
}

export default App;
