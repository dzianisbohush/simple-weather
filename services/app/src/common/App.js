import React from 'react';
import { createGlobalStyle } from 'styled-components'
import WeatherComponent from 'common/weather/component';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`;

function App() {
  return (
      <div className="App">
        <GlobalStyle />
        <WeatherComponent />
      </div>
  );
}

export default App;