import React, { useReducer } from 'react';

const initialState = {
  color: '#b2ff66',
  before: [],
  after: []
};

const reducer = (state, action) => {
  switch(action.type) {
    case 'COLOR_CHANGE': {
      const before = [...state.before, state.color];
      return { color: action.payload, before, after: state.after };
    }
    case 'COLOR_UNDO': {
      const before = state.before.slice(0, -1);
      const after = [state.color, ...state.after];
      return { color: state.before.slice(-1)[0], before, after };
  }
    case 'COLOR_REDO':
      const before = [...state.before, state.color];
      const after = state.after.slice(1);
      return { color: state.after[0], before, after };   
  }	
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const record = ({ target }) => {
    dispatch({
      type: target.id,
      payload: target.value
    });
  };

  const undo = ({ target }) => {
    dispatch({
      type: target.id
    });
  };

  const redo = ({ target }) => {
    dispatch({
      type: target.id
    });
  };

  return (
    <>
      <button data-testid="undo" onClick={undo} id="COLOR_UNDO">undo</button>
      <button data-testid="redo" onClick={undo} id="COLOR_REDO">redo</button>
      <label htmlFor="COLOR_CHANGE">color-picker</label>
      <input
        id="COLOR_CHANGE"
        type="color"
        value={state.color}
        onChange={ record } />
      <div
        data-testid="color-box"
        style={{ backgroundColor: state.color, width: '10rem', height: '10rem' }}
      ></div>
    </>
  );
}	
export default App;



//EXTRA LINES FOR DAN

