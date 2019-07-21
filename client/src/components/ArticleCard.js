import React from 'react';
import moment from 'moment';

import nytLogo from '../assets/the-new-york-times-logo-vert.png';
import './ArticleCard.scss';

const ArticleCard = ({ article }) => {
  const ellipsis = article.abstract.split(' ').length > 26 && '...';
  return (
    <a
      className="card"
      href={article.web_url}
      rel="noopener noreferrer"
      target="_blank"
    >
      <div
        className="card__image"
        style={{
          background: article.multimedia
            ? `center / cover no-repeat url('${article.multimedia}')`
            : `center / 40% 50% no-repeat url('${nytLogo}')`
        }}
      />
      <h3 className="card__title">{article.headline.main}</h3>
      <p className="card__abstract">
        {article.abstract.split(' ', 24).join(' ')}
        {ellipsis}
      </p>
      <div className="card__misc-info">
        <p className="card__published">{moment(article.pub_date).fromNow()}</p>
        <p className="card__read-time">
          {Math.round(article.word_count / 250)} min read
        </p>
      </div>
    </a>
  );
};

export default ArticleCard;
