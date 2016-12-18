import React from 'react';
import FaFrown from 'react-icons/lib/fa/frown-o';

const NotFound = () => {
  let styles = {
    title: {fontWeight: '300', fontSize: '30px', color: "#f2e9dc"}
  };
  return(
  <div style={{textAlign: 'center'}}>
    <div style={styles.title}>OH SHEET! 404 PAGE</div>
    <div><a href='/' style={styles.title}>Come Back Home</a></div>
    <FaFrown style={{color: '#f2e9dc'}} size={'300px'} />
  </div>
  );
};

export default NotFound;
