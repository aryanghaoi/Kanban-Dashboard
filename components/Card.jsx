import React from 'react';
import '../styles/Card.css';

const Card = ({ id, title, user,tag }) => {
  return (
    <div className="card" key={id}>
      <div className="card-header">
        <div className="card-title">{id}</div>
        <img src={"https://i.pravatar.cc/100"} alt="User" className="profile-pic" />
      </div>
      <div className="card-content">
        <h2>{title}</h2>
      </div>
      <div className="card-footer">
        <div className="icon">!</div>
        <div className="label">{tag}</div>
      </div>
    </div>
  );
};

export default Card;
