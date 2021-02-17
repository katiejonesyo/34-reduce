import React, { useState } from 'react';


  const useRecord = (init) => {
  const [before, setBefore] = useState([]);
  const [current, setCurrent] = useState(init);
  const [after, setAfter] = useState([]);

  const undo = () => {
    setAfter(after => [current, ...after]);
    setCurrent(before[before.length - 1]);
    setBefore(before => before.slice(0, -1));
  };

  const redo = () => {
    setBefore(before => [...before, current]);
    setCurrent(after[0]);
    setAfter(after => after.slice(1));
  };

  const record = val => {
    setBefore(before => [...before, current]);
    setCurrent(val);
  };

  return {
    undo,
    record,
    redo,
    current,
  };
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



