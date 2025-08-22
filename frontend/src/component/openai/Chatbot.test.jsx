import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Chatbot from '../openai/Chatbot';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query) => ({
    matches: query.includes('max-width: 600px'), // Simulate mobile screens
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }),
});

describe('Chatbot Component Responsiveness', () => {
  test('should initially be a collapsed widget', () => {
    render(<Chatbot />);
    const widget = screen.getByRole('button', { name: /open chatbot/i });
    expect(widget).toBeInTheDocument();
    expect(widget.parentElement).toHaveClass('chatbot-widget');
    expect(widget.parentElement).not.toHaveClass('open');
  });

  test('should expand to the correct size on desktop when clicked', async () => {
    // Simulate a desktop environment
    window.matchMedia = (query) => ({ matches: false, media: query });
    render(<Chatbot />);

    const openButton = screen.getByRole('button', { name: /open chatbot/i });
    fireEvent.click(openButton);

    const chatbotContainer = screen.getByRole('dialog', { name: /ai assistant/i });
    await waitFor(() => {
      expect(chatbotContainer.parentElement).toHaveClass('open');
    });

    expect(chatbotContainer.parentElement).toHaveStyle(`
      width: 400px;
      height: 75vh;
      max-height: 600px;
    `);
  });

  test('should expand to the correct size on mobile when clicked', async () => {
    // Simulate a mobile environment
    window.matchMedia = (query) => ({ matches: true, media: query });
    render(<Chatbot />);

    const openButton = screen.getByRole('button', { name: /open chatbot/i });
    fireEvent.click(openButton);

    const chatbotContainer = screen.getByRole('dialog', { name: /ai assistant/i });
    await waitFor(() => {
      expect(chatbotContainer.parentElement).toHaveClass('open');
    });

    expect(chatbotContainer.parentElement).toHaveStyle(`
      width: 90vw;
      height: 85vh;
    `);
  });

  test('should send a message and display a bot response', async () => {
    render(<Chatbot />);
    fireEvent.click(screen.getByRole('button', { name: /open chatbot/i }));

    const textarea = screen.getByPlaceholderText(/type your question.../i);
    const sendButton = screen.getByRole('button', { name: /send message/i });

    // Mock the fetch API for the AI response
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ answer: 'Mocked AI response' }),
      })
    );

    fireEvent.change(textarea, { target: { value: 'Test question' } });
    fireEvent.click(sendButton);

    // Check for the user message
    await waitFor(() => {
      expect(screen.getByText('Test question')).toBeInTheDocument();
    });

    // Check for the bot's response
    await waitFor(() => {
      expect(screen.getByText('Mocked AI response')).toBeInTheDocument();
    });
  });
});