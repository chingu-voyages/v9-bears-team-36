import React from 'react';

class DisastersList extends React.Component {
  state = {};

  render() {
    const { disasters } = this.props;
    return (
      <ul>
        {disasters.length > 0 &&
          disasters.map(disaster => <li key={disaster.id}>{disaster.name}</li>)}
      </ul>
    );
  }
}

export default DisastersList;
