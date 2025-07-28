import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "./login";
import { BrowserRouter } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

// Mock Firebase
jest.mock("firebase/auth", () => ({
  signInWithEmailAndPassword: jest.fn(),
  signInWithPopup: jest.fn(),
  GoogleAuthProvider: {
    credentialFromResult: jest.fn(() => ({ accessToken: "mock-token" })),
  },
}));

// Mock Firebase config
jest.mock("../firebase", () => ({
  auth: {},
  provider: {},
}));

// Utility to render with Router
const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe("Login Component", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("renders all input fields and buttons", () => {
    renderWithRouter(<Login />);
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /continue with google/i })).toBeInTheDocument();
  });

  test("shows error for wrong credentials", async () => {
    signInWithEmailAndPassword.mockRejectedValue({ code: "auth/wrong-password" });

    renderWithRouter(<Login />);

    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: "wrongpassword" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() =>
      expect(screen.getByText(/incorrect password/i)).toBeInTheDocument()
    );
  });

  test("successful login stores token and redirects", async () => {
    const mockUser = { accessToken: "mockToken123" };
    signInWithEmailAndPassword.mockResolvedValue({ user: mockUser });

    renderWithRouter(<Login />);

    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: "user@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: "correctpassword" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(localStorage.getItem("authToken")).toBe("mockToken123");
    });
  });

  test("google sign-in failure shows error", async () => {
    signInWithPopup.mockRejectedValue(new Error("Google error"));

    renderWithRouter(<Login />);

    fireEvent.click(screen.getByRole("button", { name: /continue with google/i }));

    await waitFor(() =>
      expect(screen.getByText(/google sign-in failed/i)).toBeInTheDocument()
    );
  });
});
