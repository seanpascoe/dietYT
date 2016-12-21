import React from 'react';
import './css/bootstrap-theme.min.css';
import './css/bootstrap.min.css';
import './css/App.css';

const App = (props) => {

  return (
    <div className="App">
      {/* <div>
        <Link to='/'><img src={logo} className="App-logo" alt="logo" /></Link>
      </div> */}
      {props.children}
    </div>
  );
}

export default App;
