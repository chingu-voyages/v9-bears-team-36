import React from 'react';

const DisasterPage = ({
  affectedCountries,
  disaster,
  disasterTypes,
  longDescription,
  onClick,
  shortDescription,
  showLongDescription,
  toggleDescription
}) => (
  <div>
    <button onClick={onClick}>Return</button>
    <h2>{disaster.name}</h2>
    <p>
      <span>Affected Countries: </span>
      {affectedCountries}
    </p>
    <p>
      <span>Disaster Type: </span>
      {disasterTypes}
    </p>
    <p>{showLongDescription ? longDescription : shortDescription}</p>
    <button onClick={toggleDescription}>
      {showLongDescription ? 'Show less' : 'Show more'}
    </button>
  </div>
);

export default DisasterPage;
