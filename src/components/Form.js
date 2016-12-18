import React from 'react';

export default (props) => {
  return (
    <form className="yt-form" onSubmit={props.search}>
      <div className="form-group form-group-lg">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            onChange={props.qUpdate}
            value={props.q || ''}
            required
            placeholder="Search..."/>
          <span
            className="input-group-addon btn"
            onClick={props.search}>
            <span className="glyphicon glyphicon-search"></span>
          </span>
        </div>
      </div>
    </form>
  )
}
