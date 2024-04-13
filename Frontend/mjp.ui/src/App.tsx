import React from 'react';

import { MJPApp } from './MJPApp';
import { BrowserRouter } from 'react-router-dom';


import "./assets/css/bootstrap.min.css"; 
import "./assets/css/site.css";



function App() {
  return (
         <BrowserRouter>
        <MJPApp />
        </BrowserRouter>
    
  );
}

export default App;
