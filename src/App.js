import React from "react";
import Fix from "./components/fix";

import "./App.css";

const App = () => {
  return (
    <div className='container'>
      <div className='heading'>
        <h1>Spacetagram</h1>
        <p>Enjoy lovely views from NASA's Rovers</p>
      </div>
      <Fix />
    </div>
  );
};

export default App;
