/* eslint-disable no-undef */



import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Hero from "../landing_page/home/Hero";

describe("Hero Component", () => {
  it("renders heading correctly", () => {
    render(<Hero />);
    expect(screen.getByText("Trade Smarter, Track Better")).toBeInTheDocument();
  });

  it("renders the explore button", () => {
    render(<Hero />);
    expect(screen.getByRole("button", { name: /Explore Demo/i })).toBeInTheDocument();
  });

  it("shows educational disclaimer", () => {
    render(<Hero />);
    expect(
      screen.getByText(/educational demonstration of a trading platform/i)
    ).toBeInTheDocument();
  });
});
