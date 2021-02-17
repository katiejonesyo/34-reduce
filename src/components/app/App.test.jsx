import React from 'react';
import {render, cleanup, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

describe('App component', () => {
  afterEach(() => cleanup());
  it('renders App', () => {
    const { asFragment } = render(<App />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('sets the color to green', async() => {
    render(<App/>);
    const colorPicker = await screen.findByLabelText('color-picker');
    const colorBox = await screen.findByTestId('color-box');

    fireEvent.change(colorPicker, {
      target: {
        value: '#b2ff66'
      }
    });

    return waitFor(() => {
      expect(colorBox.style.backgroundColor).toBe('rgb(178, 255, 102)');
    });
  });

  it('Undo previous color', async() => {
    render(<App />);
    const colorPicker = await screen.findByLabelText('color-picker');
    const colorBox = await screen.findByTestId('color-box');
    const undo =  await screen.findByTestId('undo');

    fireEvent.change(colorPicker, {
      target: {
        value: '#b2ff68'
      }
    });
    fireEvent.click(undo);

    return waitFor(() => {
      expect(colorBox.style.backgroundColor).toBe('rgb(178, 255, 102)');
    });
  });

  it('redo setting the color to green', async() => {
    render(<App/>);

    const colorPicker = await screen.findByLabelText('color-picker');
    const colorBox = await screen.findByTestId('color-box');
    const undo = await screen.findByText('undo');
    const redo = await screen.findByText('redo');

    fireEvent.change(colorPicker, {
      target: {
        value: '#b2ff66'
      }
    });

    fireEvent.click(undo);
    fireEvent.click(redo);

    return waitFor(() => {
      expect(colorBox.style.backgroundColor).toBe('rgb(178, 255, 102)');
    });
  });
});



//EXTRA LINES FOR DAN



