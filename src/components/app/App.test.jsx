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
      expect(colorPicker).toHaveValue('#b2ff66');
      expect(colorBox.style.backgroundColor).toBe('rgb(178, 255, 102)');
    });
  });

  it('Undo previous color', async() => {
    render(<App />);
    const colorPicker = screen.getByLabelText('color-picker');
    const undo =  screen.getByTestId('undo');
    fireEvent.change(colorPicker, {
      target: {
        value: '#b2ff68'
      }
    });
    fireEvent.click(undo);
    const div = await screen.findByTestId('undo');
    expect(div).toHaveStyle({
      backgroundColor: 'rgb(178, 255, 102)'
    });
  });
});





