import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

// Mock global fetch
beforeEach(() => {
  global.fetch = jest.fn((url, options) => {
    // Mock response based on the operation
    const searchParams = new URLSearchParams(options.body);
    const number1 = parseFloat(searchParams.get('number1'));
    const number2 = parseFloat(searchParams.get('number2'));

    let result;
    if (url.includes('add')) {
      result = number1 + number2;
      if (!Number.isFinite(result) || Math.abs(result) > 1e15 || Math.abs(result) < 1e-6) {
        result = result.toExponential(2);
      }
      else {
        result = Number.isInteger(result) ? result : result.toFixed(2);
      }
    } else if (url.includes('subtract')) {
      result = number1 - number2;

      if (!Number.isFinite(result) || Math.abs(result) > 1e15 || Math.abs(result) < 1e-6) {
        result = result.toExponential(2);
      }
      else {
        result = Number.isInteger(result) ? result : result.toFixed(2);
      }
    }

    return Promise.resolve({
      json: () => Promise.resolve({ formattedResult: result }),
    });
  });
});

afterEach(() => {
  jest.clearAllMocks();
})

describe('Calculator Application', () => {
  it('should add two numbers', async () => {
    render(<App />);

    fireEvent.change(screen.getByLabelText('Number 1'), { target: { value: '5' } });
    fireEvent.change(screen.getByLabelText('Number 2'), { target: { value: '3' } });

    fireEvent.click(screen.getByText('Add'));

    await waitFor(() => expect(screen.getByText('Result: 8')).toBeInTheDocument());
  });

  it('should subtract two numbers', async () => {
    render(<App />);

    fireEvent.change(screen.getByLabelText('Number 1'), { target: { value: '1' } });
    fireEvent.change(screen.getByLabelText('Number 2'), { target: { value: '-999999' } });

    fireEvent.click(screen.getByText('Subtract'));

    await waitFor(() => expect(screen.getByText('Result: 1000000')).toBeInTheDocument());
  });
});