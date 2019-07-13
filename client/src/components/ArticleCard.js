import React from 'react';

import './ArticleCard.scss';

const ArticleCard = ({ article }) => {
  const ellipsis = article.abstract.split(' ').length > 26 && '...';
  return (
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
      <p className="card__abstract">
        {article.abstract.split(' ', 26).join(' ')}
        {ellipsis}
      </p>
      <p className="card__read-time">
        {Math.round(article.word_count / 250)} min read
      </p>
    </a>
  );
};

export default ArticleCard;
