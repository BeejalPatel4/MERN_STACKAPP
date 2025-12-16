
// Home.test.jsx
import React from "react";
import { render, screen, fireEvent, act, waitFor } from "@testing-library/react";
import Home from "./Home";
import gsap from "gsap";

jest.mock("gsap", () => ({
  context: (cb) => ({ revert: jest.fn() }),
  timeline: jest.fn(() => ({
    from: jest.fn().mockReturnThis()
  })),
  to: jest.fn()
}));

jest.mock("react-router-dom", () => ({
  useNavigate: () => jest.fn()
}));

describe("Home Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders heading and paragraph", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { name: /food recipi/i })).toBeInTheDocument();
    expect(screen.getByText(/A recipe is a formula/i)).toBeInTheDocument();
  });

  it("initializes GSAP animations", () => {
    render(<Home />);
    expect(gsap.timeline).toHaveBeenCalled();
  });

  it("shows loading animation then renders content", async () => {
    jest.useFakeTimers();
    render(<Home />);
    expect(screen.getByText(/Stirring up something tasty/i)).toBeInTheDocument();
    
    act(() => {
      jest.advanceTimersByTime(1500);
    });

    await waitFor(() =>
      expect(screen.queryByText(/Stirring up something tasty/i)).not.toBeInTheDocument()
    );
    jest.useRealTimers();
  });

  it("navigates to /addrecipe when token exists", () => {
    const mockNavigate = jest.fn();
    Storage.prototype.getItem = jest.fn(() => "valid_token");

    jest.mock("react-router-dom", () => ({
      useNavigate: () => mockNavigate
    }));

    render(<Home />);
    fireEvent.click(screen.getByText(/Share Your Recipe/i));
    expect(mockNavigate).toHaveBeenCalledWith("/addrecipe");
  });

  it("opens modal if token is missing", () => {
    Storage.prototype.getItem = jest.fn(() => null);
    render(<Home />);
    fireEvent.click(screen.getByText(/Share Your Recipe/i));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("renders social icons with links", () => {
    render(<Home />);
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(4);
  });
});
