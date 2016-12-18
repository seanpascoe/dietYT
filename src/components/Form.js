import React from 'react';

export default (props) => {
  const styles = {
    form: {
      maxWidth: '500px',
      marginLeft: 'auto',
      marginRight: 'auto',
      padding: "10px"}
  }
  return (
    <form style={styles.form} onSubmit={props.search}>
      <div className="form-group form-group-lg">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            onChange={props.qUpdate}
            value={props.q || ''}
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
