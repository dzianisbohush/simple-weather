import React from 'react';
import { createGlobalStyle } from 'styled-components'
import AppRoutes from 'common/AppRoutes';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`;

function App() {
  return (
      <div className="App">
        <GlobalStyle />
        <AppRoutes />
      </div>
  );
}

export default App;