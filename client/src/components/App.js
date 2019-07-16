import React from 'react';
import axios from 'axios';

import './App.scss';
import SearchBar from './SearchBar';
import DisasterPageWrapper from './DisasterPageWrapper';
import HomeMap from './HomeMap';
import ErrorBoundary from './ErrorBoundary';
import ErrorModal from './ErrorModal';

require('dotenv').config();

class App extends React.Component {
  state = {
    apiCalls: 0,
    countries: [],
    disasters: [],
    disaster: null,
    disastersSearchList: [],
    error: null,
    filterBySearch: false,
    search: '',
    selectedCountry: null
  };

  getAllDisasters = async event => {
    try {
      this.setState({ error: null });
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
    } catch (error) {
      this.setState(() => ({
        error: error.message,
        apiCalls: this.state.apiCalls + 1
      }));
    }
  };

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
      () => ({
        filterBySearch: false,
        search: '',
        selectedCountry: null,
        disastersSearchList: []
      }),
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
      apiCalls,
      countries,
      disaster,
      disasters,
      disastersSearchList,
      error,
      search,
      selectedCountry
    } = this.state;

    return (
      <div className="App">
        {disaster ? (
          <ErrorBoundary>
            <DisasterPageWrapper
              disaster={disaster}
              onClick={this.handleClearDisaster}
              selectedCountry={selectedCountry}
            />
          </ErrorBoundary>
        ) : (
          <div className="main-page">
            <ErrorBoundary>
              <h1 className="app__title">Global Disasters</h1>
              <SearchBar
                countries={countries}
                disabled={selectedCountry}
                onChange={this.onSearchChange}
                onReset={this.onReset}
                onSubmit={this.onSearchSubmit}
                selectedCountry={selectedCountry}
                value={search}
              />
              <HomeMap
                data={disasters}
                searchList={disastersSearchList}
                searchResult={selectedCountry}
                handleSetDisaster={this.handleSetDisaster}
                onMarkerClick={this.setSelectedCountry}
                style={{ height: '70vh' }}
              />
              {error && (
                <ErrorModal
                  apiCalls={apiCalls}
                  error={error}
                  getDisastersAgain={this.getAllDisasters}
                />
              )}
            </ErrorBoundary>
          </div>
        )}
      </div>
    );
  }
}

export default App;
