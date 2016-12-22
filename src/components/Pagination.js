import React from 'react';

export default (props) => {
  let scrollToElem = document.getElementById("resultsTop")

  let getNext = () => {
    if(!props.nextPage) {
      return
    }
    props.fetchVids(props.nextPage);
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
        <span className={`btn btn-default btn-xs${props.prevPage ? '' : ' disabled'}`} onClick={getPrev}>Prev</span><span className={`btn btn-default btn-xs${props.nextPage ? '' : ' disabled'}`} onClick={getNext}>Next</span>
      </div>
    </div>
  )
}
