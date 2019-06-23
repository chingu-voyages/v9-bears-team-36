import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';

const mapStyles = [{ width: '100%' }, { height: '100%' }];

class HomeMap extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  };

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  };

  onMapClick = props => {
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
        {data.map(location => {
          const { lat } = location.countries.filter(
            country => country.primary
          )[0].location;
          const { lng } = location.countries.filter(
            country => country.primary
          )[0].location;
          return (
            <Marker
              onClick={this.onMarkerClick}
              name={location.name}
              key={location.id}
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
            <a href="/specificDisaster">{this.state.selectedPlace.name}</a>
          </>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API
})(HomeMap);
