import React from 'react';

export default ({children}) => {

  return (
    <div className="container">
      <div className="row">
        <div className="col-xs-12 col-md-8 col-md-offset-2 yt-results">
          {children}
        </div>
      </div>
    </div>
  )
}
