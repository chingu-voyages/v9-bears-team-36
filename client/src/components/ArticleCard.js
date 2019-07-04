import React from 'react';

import './ArticleCard.scss';

const ArticleCard = ({ article }) => (
  <a className="card" href={article.web_url} title={article.headline.main}>
    <h3 className="card__text">{article.headline.main}</h3>
    {article.multimedia && (
      <div
        className="card__image"
        style={{ backgroundImage: `url('${article.multimedia}')` }}
      />
    )}
  </a>
);

export default ArticleCard;
