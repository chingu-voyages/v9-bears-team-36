import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const mapStyles = [{ width: '100%' }, { height: '100%' }];

class HomeMap extends Component {
  render() {
    const { google, data } = this.props;
    return (
      <Map
        google={google}
        zoom={2}
        styles={mapStyles}
        initialCenter={{ lat: 41.2284, lng: 80.9098 }}
      >
        {data.map(location => {
          const { lat } = location.countries[0].location;
          const { lng } = location.countries[0].location;
          return (
            <Marker
              name={location.name}
              key={location.id}
              position={{
                lat,
                lng
              }}
            />
          );
        })}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API
})(HomeMap);
