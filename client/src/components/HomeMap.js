import React from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';

import './HomeMap.scss';

const mapStyles = [{ width: '100%' }, { height: '100%' }];

class HomeMap extends React.Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  };

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
    const { activeMarker, showingInfoWindow, selectedPlace } = this.state;

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

        <InfoWindow marker={activeMarker} visible={showingInfoWindow}>
          <p className="title">Click for more information</p>
          <ul className="list">
            <p className="title">{activeMarker ? activeMarker.name : ''}</p>
            {selectedPlace.countryDisasterList &&
              selectedPlace.countryDisasterList.map(disaster => {
                return (
                  // Link to corresponding disaster component
                  <li>
                    <a
                      href={`/${disaster.id}`}
                      key={disaster.id}
                      className="list__link"
                    >
                    {disaster.name}
                  </a>
                  </li>
                );
              })}
          </ul>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API
})(HomeMap);
