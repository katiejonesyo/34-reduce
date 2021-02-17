import React, { useReducer } from 'react';

const initialState = {
  color: 'green',
  before: [],
  after: []
};

function reducer(state, action) {
  switch(action.type) {
    case 'COLOR_CHANGE': {
      const before = [...state.before, state.color];
      return { color: action.payload, before };
    }
    case 'COLOR_UNDO':
      return;
    case 'COLOR_REDO':
      return;
    default:
      return state;
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

  return (
    <>
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



