import React from 'react';

class DisasterPage extends React.Component {
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
    return (
      <div>
        <button onClick={this.props.onClick}>Return</button>
        <h2>{this.props.disaster.name}</h2>
        <p>
          <span>Affected Countries: </span>
          {this.props.disaster.countries
            .sort((a, b) => b.primary - a.primary)
            .map(country => country.name)
            .join(', ')}
        </p>
        <p>
          <span>Disaster Type: </span>
          {this.props.disaster.types
            .sort((a, b) => b.primary - a.primary)
            .map(type => type.type)
            .join(', ')}
        </p>
        <p>
          {this.state.showLongDescription
            ? this.state.longDescription
            : this.state.shortDescription}
        </p>
        <button onClick={this.toggleDescription}>
          {this.state.showLongDescription ? 'Show less' : 'Show more'}
        </button>
      </div>
    );
  }
}

export default DisasterPage;
