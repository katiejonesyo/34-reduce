import React, { useReducer } from 'react';

const initialState = {
  color: 'green',
  before: [],
  after: []
};

function App() {
  const { current, undo, redo, record } = useRecord('#b2ff66');

  return (
    <>
      <button data-testid="undo" onClick={undo}>undo</button>
      <button data-testid="redo" onClick={redo}>redo</button>
      <label htmlFor="color-picker">color-picker</label>
      <input
        id="color-picker"
        type="color"
        value={current}
        onChange={({ target }) => record(target.value)}/>
      <div
        data-testid="color-box"
        style={{ backgroundColor: current, width: '10rem', height: '10rem' }}
      ></div>
    </>
  );
}	
export default App;



