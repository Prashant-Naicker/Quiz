import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

describe("Author Quiz", () => {
  it("render without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
  }); 
});
