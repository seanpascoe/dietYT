import React from 'react';
import { Link } from 'react-router';
import '../css/ListItem.css';

export default (props) => {
  return (
    <Link to={`/video/${props.id}`} className="yt-item">
      <div className="row">
        <div className="col-xs-4">
          <img className="yt-thumbnail" src={props.img} alt={props.title} />
        </div>
        <div className="col-xs-8">
          <h3 className="yt-title">{props.title}</h3>
          <p className="hidden-xs">{props.description}</p>
        </div>
      </div>
      <div className="yt-divider"></div>
    </Link>
  )
}
