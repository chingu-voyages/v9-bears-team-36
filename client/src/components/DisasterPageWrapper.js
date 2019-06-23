import React from 'react';

import DisasterPage from './DisasterPage';

class DisasterPageWrapper extends React.Component {
  state = {
    longDescription: '',
    shortDescription: '',
    showLongDescription: false
  };

  componentDidMount() {
    const longDescription = this.props.disaster.description
      .replace(/\(http.*\)/gi, '')
      .replace(/\(\[.*\]/g, '')
      .replace(/###.*/g, '')
      .replace(/- \[!\[.*\]/g, '')
      .replace(/\[<img.*>\]/g, '');
    const shortDescription = longDescription.split('. ', 3).join('. ') + '.';

    this.setState(() => ({ longDescription, shortDescription }));
  }

  toggleDescription = () => {
    this.setState(prevState => ({
      showLongDescription: !prevState.showLongDescription
    }));
  };

  render() {
    const affectedCountries = this.props.disaster.countries
      .sort((a, b) => b.primary - a.primary)
      .map(country => country.name)
      .join(', ');
    const disasterTypes = this.props.disaster.types
      .sort((a, b) => b.primary - a.primary)
      .map(type => type.type)
      .join(', ');

    return (
      <DisasterPage
        {...this.props}
        {...this.state}
        affectedCountries={affectedCountries}
        disasterTypes={disasterTypes}
        toggleDescription={this.toggleDescription}
      />
    );
  }
}

export default DisasterPageWrapper;
