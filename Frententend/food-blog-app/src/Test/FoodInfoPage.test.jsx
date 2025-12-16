// FoodInfoPage.test.jsx
import React from "react";
import { render, screen } from "@testing-library/react";
import FoodInfoPage from "../FoodInfoPage";

describe("FoodInfoPage Component", () => {
  it("renders the main heading", () => {
    render(<FoodInfoPage />);
    expect(screen.getByRole("heading", { name: /learn about food/i })).toBeInTheDocument();
  });

  it("renders the introductory paragraph", () => {
    render(<FoodInfoPage />);
    expect(screen.getByText(/food provides the energy and nutrients/i)).toBeInTheDocument();
  });

  it("renders all category boxes", () => {
    render(<FoodInfoPage />);
    const categories = ["Fruits", "Vegetables", "Grains", "Proteins", "Dairy"];
    categories.forEach((category) => {
      expect(screen.getByText(category)).toBeInTheDocument();
    });
  });

  it("renders all category descriptions", () => {
    render(<FoodInfoPage />);
    expect(screen.getByText(/Packed with vitamins/i)).toBeInTheDocument();
    expect(screen.getByText(/Rich in fiber/i)).toBeInTheDocument();
    expect(screen.getByText(/Main source of energy/i)).toBeInTheDocument();
    expect(screen.getByText(/Builds and repairs body tissues/i)).toBeInTheDocument();
    expect(screen.getByText(/Provides calcium for strong bones/i)).toBeInTheDocument();
  });

  it("renders links for each category", () => {
    render(<FoodInfoPage />);
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(5); // 5 categories
    expect(links[0]).toHaveAttribute("href", expect.stringContaining("http"));
    expect(links[0]).toHaveAttribute("target", "_blank");
  });

  it("displays a fun fact", () => {
    render(<FoodInfoPage />);
    const funFactHeader = screen.getByRole("heading", { name: /fun fact/i });
    expect(funFactHeader).toBeInTheDocument();

    const fact = screen.getByText(/!/); // catch the exclamation mark in fun facts
    expect(fact).toBeInTheDocument();
  });
});
