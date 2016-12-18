import React from 'react';
import logo from './images/logo.png';
import './css/bootstrap-theme.min.css';
import './css/bootstrap.min.css';
import './css/App.css';

const App = (props) => {
  const styles = {
    logo: {
      paddingTop: '10px',
      marginBottom: '50px',
      maxWidth: '150px',
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  }

  return (
    <div className="App">
      <div>
        <img style={styles.logo} src={logo} className="App-logo" alt="logo" />
      </div>
      {props.children}
    </div>
  );
}

export default App;
