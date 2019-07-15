import React from 'react';

import './DisasterPage.scss';
import ArticleCard from './ArticleCard';

const DisasterPage = ({
  affectedCountries,
  articles,
  disaster,
  disasterTypes,
  error,
  longDescription,
  onClick,
  shortDescription,
  showLongDescription,
  toggleDescription
}) => (
  <div className="container">
    <button className="return-button" onClick={onClick}>
      {'<   '} Return
    </button>
    <div className="content__container">
      <div className="disaster__container">
        <h2 className="disaster__header">{disaster.name}</h2>
        <p className="disaster__list">
          <span className="disaster__list__label">Affected Countries: </span>
          {affectedCountries}
        </p>
        <p className="disaster__list">
          <span className="disaster__list__label">Disaster Type: </span>
          {disasterTypes}
        </p>
        <p className="disaster__description">
          {showLongDescription ? longDescription : shortDescription}
        </p>
        {longDescription && (
          <button
            className="description__toggle-button"
            onClick={toggleDescription}
          >
            {showLongDescription ? 'Show less' : 'Show more'}
          </button>
        )}
      </div>
      <div className="articles__container">
        <h3 className="articles__header">Related Stories</h3>
        {error && <p className="articles__error">{error}</p>}
        <div className="articles__grid">
          {articles.map(article => (
            <ArticleCard article={article} />
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default DisasterPage;
