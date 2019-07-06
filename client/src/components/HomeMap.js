import React from 'react';
import ReactDOM from 'react-dom';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';

import './HomeMap.scss';

const mapStyles = [{ width: '100%' }, { height: '100%' }];

class HomeMap extends React.Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  };

  onInfoWindowOpen(props, e) {
    // infoWindow is rendered from a string and loses all event bindings
    // Solution here - https://github.com/fullstackreact/google-maps-react/issues/70
    const { activeMarker, selectedPlace } = this.state;

    const list = (
      <ul className="list">
        <p className="title">{activeMarker ? activeMarker.name : ''}</p>
        {selectedPlace.countryDisasterList &&
          selectedPlace.countryDisasterList.map(disaster => {
            return (
              // Button to render corresponding disaster component
              <li key={disaster.id}>
                <button
                  value={disaster.id}
                  onClick={e => {
                    props.handleSetDisaster(disaster.id);
                  }}
                >
                  {disaster.name}
                </button>
              </li>
            );
          })}
      </ul>
    );
    ReactDOM.render(React.Children.only(list), document.getElementById('iwc'));
  }

  onMarkerClick = (props, marker) => {
    // Map over this.props [disasters] to find all disasters that list the Marker country in their [countries]
    // Add these disaster names and ids to array, filter, sort and put in selectedPlace obj to access in the infoWindow
    const countryDisasterList = [].concat
      .apply(
        [],
        this.props.data.map(disaster =>
          disaster.countries.map(country => {
            return country.id === props.countryId
              ? { name: disaster.name, id: disaster.id }
              : false;
          })
        )
      )
      .filter(val => val !== false)
      .sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });

    this.setState({
      selectedPlace: { countryDisasterList, ...props },
      activeMarker: marker,
      showingInfoWindow: true
    });

    this.props.onMarkerClick(props.countryId);
  };

  onMapClick = () => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  renderMarker(countries) {
    // Add marker for all unique countries
    return countries.map(country => {
      const { lat } = country.location;
      const { lng } = country.location;

      return (
        <Marker
          countryId={country.id}
          name={country.name}
          onClick={this.onMarkerClick}
          key={country.id}
          position={{
            lat,
            lng
          }}
        />
      );
    });
  }

  renderDataMarker(data) {
    // Add all countries to an array, filter out unique countries and return
    const dataCountriesList = [];
    data.map(disaster =>
      disaster.countries.map(country => dataCountriesList.push(country))
    );
    const filteredDataCountriesList = dataCountriesList.filter(
      (country, index, self) =>
        self.findIndex(uniqueCountry => {
          return uniqueCountry.id === country.id;
        }) === index
    );

    return this.renderMarker(filteredDataCountriesList);
  }

  renderSearchMarker(searchResult) {
    // Return single country from search result as an array
    const searchArr = [];
    searchArr.push(searchResult);

    return this.renderMarker(searchArr);
  }

  render() {
    const { google, data, searchResult, searchList } = this.props;
    const { activeMarker, showingInfoWindow } = this.state;

    return (
      <Map
        google={google}
        zoom={2}
        styles={mapStyles}
        initialCenter={{ lat: 41.2284, lng: 80.9098 }}
        onClick={this.onMapClick}
      >
        {searchList.length
          ? this.renderSearchMarker(searchResult)
          : this.renderDataMarker(data)}

        <InfoWindow
          marker={activeMarker}
          visible={showingInfoWindow}
          onOpen={e => {
            this.onInfoWindowOpen(this.props, e);
          }}
        >
          <div id="iwc" />
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API
})(HomeMap);
