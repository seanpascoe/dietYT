import React from 'react';

export default (props) => {
  let scrollToElem = document.getElementById("resultsTop")

  let getNext = () => {
    props.fetchVids(props.nextPage);
    // document.body.scrollTop = document.documentElement.scrollTop = props.scroll;

    scrollToElem.scrollIntoView(true);
  }

  let getPrev = () => {
    if(!props.prevPage) {
      return
    }
    props.fetchVids(props.prevPage);
    scrollToElem.scrollIntoView(true);
  }

  return (
    <div className="pag-cont" style={{display: props.vidsL ? "block" : "none"}}>
      <div className="vid-pag">
        <span className={`btn btn-default btn-xs${props.prevPage ? '' : ' disabled'}`} onClick={getPrev}>Prev</span><span className="btn btn-default btn-xs" onClick={getNext}>Next</span>
      </div>
    </div>
  )
}
