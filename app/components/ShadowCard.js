// components/ShadowCard.js

import React from 'react';

const ShadowCard = ({ title, content, handleClick }) => {
  return (
    <div className="shadow-card" onClick={handleClick}>
      <h2>{title}</h2>
      <p>{ministry}</p>
    </div>
  );
};

export default ShadowCard;
