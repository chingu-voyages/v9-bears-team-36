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
    filterBySearch: false,
    search: '',
    selectedCountry: null
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
    if (this.state.filterBySearch) {
      const disasterSearchResults = this.state.disasters.filter(disaster =>
        disaster.countries.find(
          country => country.name === this.state.selectedCountry.name
        )
          ? true
          : false
      );

      this.setState(() => ({
        disastersSearchList: disasterSearchResults
      }));
    }
  };

  setSelectedCountry = (countryId, filterBySearch = false) => {
    this.setState(
      () => ({
        filterBySearch,
        search: '',
        selectedCountry: this.state.countries.find(
          country => country.id === countryId
        )
      }),
      () => this.updateDisastersSearchList()
    );
  };

  onSearchSubmit = e => {
    e.preventDefault();

    const countryId = Number(e.target.value);

    this.setSelectedCountry(countryId, true);
  };

  onReset = e => {
    e.preventDefault();

    this.setState(
      () => ({ search: '', selectedCountry: null, disastersSearchList: [] }),
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
      selectedCountry
    } = this.state;

    return (
      <div className="App">
        {disaster ? (
          <DisasterPageWrapper
            disaster={disaster}
            onClick={this.handleClearDisaster}
            selectedCountry={selectedCountry}
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
            <HomeMap
              data={disasters}
              searchList={disastersSearchList}
              searchResult={selectedCountry}
              handleSetDisaster={this.handleSetDisaster}
              onMarkerClick={this.setSelectedCountry}
            />
          </div>
        )}
      </div>
    );
  }
}

export default App;
