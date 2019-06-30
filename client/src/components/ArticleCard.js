import React from 'react';

const ArticleCard = ({ article }) => (
  <a href={article.web_url}>
    <h3>{article.headline.main}</h3>
    {article.multimedia && (
      <img
        style={{ height: '100px', width: '100px' }}
        src={article.multimedia}
      />
    )}
  </a>
);

export default ArticleCard;
