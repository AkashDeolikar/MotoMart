// Contact.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Contact from '../utility/contact';

// Mock window.alert
global.alert = jest.fn();

// Mock fetch
beforeEach(() => {
  jest.spyOn(window, 'fetch');
});

afterEach(() => {
  jest.restoreAllMocks();
  jest.clearAllMocks();
});

describe('Contact Component', () => {
  test('renders all form fields and submit button', () => {
    render(<Contact />);

    expect(screen.getByLabelText(/Your Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Your Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Mobile Number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Your Message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Send Message/i })).toBeInTheDocument();
  });

  test('updates form fields on change', () => {
    render(<Contact />);

    fireEvent.change(screen.getByLabelText(/Your Name/i), {
      target: { value: 'Akash' },
    });
    fireEvent.change(screen.getByLabelText(/Your Email/i), {
      target: { value: 'akash@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/Mobile Number/i), {
      target: { value: '9876543210' },
    });
    fireEvent.change(screen.getByLabelText(/Your Message/i), {
      target: { value: 'Hello, this is a test.' },
    });

    expect(screen.getByLabelText(/Your Name/i)).toHaveValue('Akash');
    expect(screen.getByLabelText(/Your Email/i)).toHaveValue('akash@example.com');
    expect(screen.getByLabelText(/Mobile Number/i)).toHaveValue('9876543210');
    expect(screen.getByLabelText(/Your Message/i)).toHaveValue('Hello, this is a test.');
  });

  test('submits form and shows success alert', async () => {
    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: 'Form submitted successfully' }),
    });

    render(<Contact />);

    fireEvent.change(screen.getByLabelText(/Your Name/i), { target: { value: 'Akash' } });
    fireEvent.change(screen.getByLabelText(/Your Email/i), { target: { value: 'akash@example.com' } });
    fireEvent.change(screen.getByLabelText(/Mobile Number/i), { target: { value: '9876543210' } });
    fireEvent.change(screen.getByLabelText(/Your Message/i), { target: { value: 'Hi team!' } });

    fireEvent.click(screen.getByRole('button', { name: /Send Message/i }));

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith('Form submitted successfully');
    });

    expect(screen.getByLabelText(/Your Name/i)).toHaveValue('');
    expect(screen.getByLabelText(/Your Email/i)).toHaveValue('');
    expect(screen.getByLabelText(/Mobile Number/i)).toHaveValue('');
    expect(screen.getByLabelText(/Your Message/i)).toHaveValue('');
  });

  test('shows error alert on failure', async () => {
    window.fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Submission failed' }),
    });

    render(<Contact />);

    fireEvent.change(screen.getByLabelText(/Your Name/i), { target: { value: 'Akash' } });
    fireEvent.change(screen.getByLabelText(/Your Email/i), { target: { value: 'akash@example.com' } });
    fireEvent.change(screen.getByLabelText(/Mobile Number/i), { target: { value: '9876543210' } });
    fireEvent.change(screen.getByLabelText(/Your Message/i), { target: { value: 'Hi team!' } });

    fireEvent.click(screen.getByRole('button', { name: /Send Message/i }));

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith('Submission failed');
    });
  });

  test('shows generic error alert on fetch error', async () => {
    window.fetch.mockRejectedValueOnce(new Error('Network error'));

    render(<Contact />);

    fireEvent.change(screen.getByLabelText(/Your Name/i), { target: { value: 'Akash' } });
    fireEvent.change(screen.getByLabelText(/Your Email/i), { target: { value: 'akash@example.com' } });
    fireEvent.change(screen.getByLabelText(/Mobile Number/i), { target: { value: '9876543210' } });
    fireEvent.change(screen.getByLabelText(/Your Message/i), { target: { value: 'Hi team!' } });

    fireEvent.click(screen.getByRole('button', { name: /Send Message/i }));

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith('Failed to send feedback. Please try again.');
    });
  });
});
