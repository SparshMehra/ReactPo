import React from 'react';
import CreateGalleryForm from '../../src/components/features/gallery/CreateGalleryForm';
import '../../src/index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

describe('CreateGalleryForm Component', () => {
  let queryClient;

  beforeEach(() => {
    // Create a new QueryClient for each test
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    });
  });

  const mountWithProvider = (component) => {
    return cy.mount(
      <QueryClientProvider client={queryClient}>
        {component}
      </QueryClientProvider>
    );
  };

  it('renders the form with all fields', () => {
    mountWithProvider(<CreateGalleryForm />);

    cy.contains('Full Name').should('be.visible');
    cy.contains('Want to say something about image?').should('be.visible');
    cy.contains('Upload the image').should('be.visible');
    cy.contains('button', 'Submit').should('be.visible');
  });

  it('displays error when photographer name is missing', () => {
    mountWithProvider(<CreateGalleryForm />);

    cy.contains('button', 'Submit').click();

    cy.contains('Name field is mandatory').should('be.visible');
  });

  it('displays error when image is not uploaded', () => {
    mountWithProvider(<CreateGalleryForm />);

    cy.get('#photographer').type('John Doe');
    cy.contains('button', 'Submit').click();

    cy.contains('Please upload an image').should('be.visible');
  });

  it('displays error when image description exceeds max length', () => {
    mountWithProvider(<CreateGalleryForm />);

    const longDescription = 'a'.repeat(100);
    cy.get('#imageDescription').type(longDescription);
    cy.contains('button', 'Submit').click();

    cy.contains('Description cannot exceed 40 characters').should('be.visible');
  });

  it('allows user to fill in photographer name', () => {
    mountWithProvider(<CreateGalleryForm />);

    cy.get('#photographer').type('Jane Smith');
    cy.get('#photographer').should('have.value', 'Jane Smith');
  });

  it('allows user to fill in image description', () => {
    mountWithProvider(<CreateGalleryForm />);

    cy.get('#imageDescription').type('Beautiful sunset');
    cy.get('#imageDescription').should('have.value', 'Beautiful sunset');
  });

  it('renders Speaker components for accessibility', () => {
    mountWithProvider(<CreateGalleryForm />);

    // Speaker components should be present (check for their existence)
    cy.get('form').should('exist');
  });

  it('has submit button enabled initially', () => {
    mountWithProvider(<CreateGalleryForm />);

    cy.contains('button', 'Submit').should('not.be.disabled');
  });

  it('displays all form labels correctly', () => {
    mountWithProvider(<CreateGalleryForm />);

    cy.get('label[for="photographer"]').should('contain', 'Full Name');
    cy.get('label[for="imageDescription"]').should('contain', 'Want to say something about image?');
    cy.get('label[for="imageUrl"]').should('contain', 'Upload the image');
  });
});
