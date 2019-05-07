import React from 'react';
import logo from './logo.svg';
import Tabs from './Tabs';

import './styles.css';
import './App.css';

function App() {
  return (
    <div>
      <div>
        <h1>Suicide Rate around the World (2016)</h1>
        <Tabs>
          <div label="Gator">
            See ya later, <em>Alligator</em>!
          </div>
          <div label="Croc">
            After 'while, <em>Crocodile</em>!
          </div>
          <div label="Sarcosuchus">
            Nothing to see here, this tab is <em>extinct</em>!
          </div>
        </Tabs>
      </div>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />

          <p>
            Hello Kukuh Basuki Rahmat!
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    </div>
  );
}

export default App;
