import React, { Component } from 'react';
import logo from './images/logo.png';
import './css/bootstrap-theme.min.css';
import './css/bootstrap.min.css';
import './css/App.css';
import { FormControl, FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap';

class App extends Component {

  render() {
    const styles = {
      logo: {
        paddingTop: '10px',
        marginBottom: '50px',
        maxWidth: '150px',
      },
      input: {
        maxWidth: '400px',
        marginLeft: 'auto',
        marginRight: 'auto'}
    }

    return (
      <div className="App">
        <div>
          <img style={styles.logo} src={logo} className="App-logo" alt="logo" />
        </div>
        <form>
          <FormGroup
            controlId="dietYTinput"
            bsSize="large"
            // validationState={this.getValidationState()}
          >
            <ControlLabel>Working example with validation</ControlLabel>
            <FormControl
              style={styles.input}
              type="text"
              //value={this.state.value}
              placeholder="Search..."
              //onChange={this.handleChange}
            />
            <FormControl.Feedback />
          </FormGroup>
        </form>
      </div>
    );
  }
}

export default App;
