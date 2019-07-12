import React from 'react';

import './ArticleCard.scss';

const ArticleCard = ({ article }) => (
  <a
    className="card"
    href={article.web_url}
    rel="noopener noreferrer"
    target="_blank"
    title={article.headline.main}
  >
    {article.multimedia ? (
      <div
        className="card__image"
        style={{ backgroundImage: `url('${article.multimedia}')` }}
      />
    ) : (
      <div className="image__background" />
    )}
    <h3 className="card__title">{article.headline.main}</h3>
    <p className="card__abstract">{article.abstract}</p>
    <p className="card__read-time">
      {Math.round(article.word_count / 250)} min read
    </p>
  </a>
);

export default ArticleCard;
