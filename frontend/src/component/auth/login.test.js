import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from './login';
import { signInWithEmailAndPassword } from 'firebase/auth';

// ✅ Correct partial mock (don't override getAuth)
jest.mock('firebase/auth', () => {
  const original = jest.requireActual('firebase/auth');
  return {
    ...original,
    signInWithEmailAndPassword: jest.fn(),
  };
});

// ✅ Mock navigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// ✅ Mock alert globally
global.alert = jest.fn();

describe('Login Component (Email/Password only)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders email and password fields', () => {
    render(<Login />, { wrapper: MemoryRouter });

    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('submits login form with valid credentials', async () => {
    signInWithEmailAndPassword.mockResolvedValueOnce({
      user: {
        accessToken: 'mock-token',
      },
    });

    render(<Login />, { wrapper: MemoryRouter });

    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'test123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
        expect.anything(),
        'test@example.com',
        'test123'
      );
      expect(alert).toHaveBeenCalledWith('Login successful!');
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });
});
