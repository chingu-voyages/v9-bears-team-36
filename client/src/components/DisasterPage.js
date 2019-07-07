import React from 'react';

import './DisasterPage.scss';
import ArticleCard from './ArticleCard';

const DisasterPage = ({
  affectedCountries,
  articles,
  disaster,
  disasterTypes,
  longDescription,
  onClick,
  shortDescription,
  showLongDescription,
  toggleDescription
}) => (
  <div className="container">
    <button className="return-button" onClick={onClick}>
      {'<'}
    </button>
    <div className="content__container">
      <h2 className="header">{disaster.name}</h2>
      <p className="list">
        <span className="list__label">Affected Countries: </span>
        {affectedCountries}
      </p>
      <p className="list">
        <span className="list__label">Disaster Type: </span>
        {disasterTypes}
      </p>
      <p className="description">
        {showLongDescription ? longDescription : shortDescription}
      </p>
      <button className="toggle-button" onClick={toggleDescription}>
        {showLongDescription ? 'Show less' : 'Show more'}
      </button>
      <h3>Related Stories</h3>
      {articles.map(article => (
        <ArticleCard article={article} />
      ))}
    </div>
  </div>
);

export default DisasterPage;
