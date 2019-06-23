import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';

const mapStyles = [{ width: '100%' }, { height: '100%' }];

class HomeMap extends Component {
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

  render() {
    const { google, data } = this.props;
    return (
      <Map
        google={google}
        zoom={2}
        styles={mapStyles}
        initialCenter={{ lat: 41.2284, lng: 80.9098 }}
        onClick={this.onMapClick}
      >
        {data.map(disaster => {
          // Add marker only to primary country for each disaster
          const country = disaster.countries.filter(country => country.primary);
          const { lat } = country[0].location;
          const { lng } = country[0].location;
          return (
            <Marker
              countryId={country[0].id}
              name={country[0].name}
              onClick={this.onMarkerClick}
              key={disaster.id}
              position={{
                lat,
                lng
              }}
            />
          );
        })}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
        >
          <>
            {this.state.showingInfoWindow &&
              this.state.selectedPlace.countryDisasterList.map(disaster => {
                return (
                  // Link to corresponding disaster component
                  <a href={`/${disaster.id}`} key={disaster.id}>
                    {disaster.name}
                  </a>
                );
              })}
          </>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API
})(HomeMap);
