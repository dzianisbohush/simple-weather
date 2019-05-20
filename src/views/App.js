import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './AppRoutes';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <AppRoutes/>
      </div>
    </BrowserRouter>
  );
}

export default App;