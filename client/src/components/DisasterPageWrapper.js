import React from 'react';
import axios from 'axios';

import DisasterPage from './DisasterPage';

class DisasterPageWrapper extends React.Component {
  state = {
    articles: [],
    error: '',
    longDescription: '',
    shortDescription: '',
    showLongDescription: false
  };

  async componentDidMount() {
    const { disaster, selectedCountry } = this.props;

    const longDescription = disaster.description
      .replace(/\(http.*\)/gi, '')
      .replace(/\(\[.*\]/g, '')
      .replace(/###.*/g, '')
      .replace(/- \[!\[.*\]/g, '')
      .replace(/\[<img.*>\]/g, '');
    const shortDescription = longDescription.split('. ', 3).join('. ') + '.';

    const articles = await axios.get('/nyt', {
      params: {
        country: selectedCountry.name,
        name: disaster.name
      }
    });

    if (articles.data.error) {
      this.setState(() => ({
        error: articles.data.error,
        longDescription,
        shortDescription
      }));
    } else {
      this.setState(() => ({
        articles: articles.data,
        longDescription,
        shortDescription
      }));
    }
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
