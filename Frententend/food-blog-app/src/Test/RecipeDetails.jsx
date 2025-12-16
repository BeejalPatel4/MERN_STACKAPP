import React from 'react';
import { expect } from 'chai';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import RecipeDetails from '../path/to/RecipeDetails';

describe('RecipeDetails Component', () => {
  // Mock recipe data to simulate useLoaderData
  const mockRecipe = {
    email: 'chef@example.com',
    title: 'Delicious Pasta',
    coverImage: 'pasta.jpg',
    ingredients: ['Pasta', 'Tomato Sauce', 'Garlic'],
    instructions: 'Boil pasta\nAdd sauce\nServe hot',
    video: 'https://www.youtube.com/watch?v=abc123',
  };

  // Stub for useLoaderData
  before(() => {
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useLoaderData: () => mockRecipe,
    }));
  });

  it('renders profile image and email', () => {
    render(<RecipeDetails />, { wrapper: MemoryRouter });
    expect(screen.getByText(mockRecipe.email)).to.exist;
    expect(screen.getByAltText('Profile')).to.exist;
  });

  it('renders the recipe title and ingredients', () => {
    render(<RecipeDetails />, { wrapper: MemoryRouter });
    expect(screen.getByText(mockRecipe.title)).to.exist;
    mockRecipe.ingredients.forEach(ingredient => {
      expect(screen.getByText(new RegExp(ingredient, 'i'))).to.exist;
    });
  });

  it('renders the instructions section', () => {
    render(<RecipeDetails />, { wrapper: MemoryRouter });
    expect(screen.getByText(/Boil pasta/i)).to.exist;
    expect(screen.getByText(/Serve hot/i)).to.exist;
  });

  it('renders embedded YouTube video if provided', () => {
    render(<RecipeDetails />, { wrapper: MemoryRouter });
    const iframe = screen.getByTitle('Recipe Video');
    expect(iframe).to.exist;
    expect(iframe.tagName).to.equal('IFRAME');
    expect(iframe.src).to.include('embed/abc123');
  });
});
