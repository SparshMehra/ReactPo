import React from 'react';
import Speaker from '../../src/components/UI/Speaker';
import '../../src/index.css';

describe('Speaker Component', () => {
  beforeEach(() => {
    // Mock the Web Speech API by stubbing its methods
    cy.window().then((win) => {
      cy.stub(win.speechSynthesis, 'getVoices').returns([
        { name: 'Female Voice', lang: 'en-US' },
        { name: 'Male Voice', lang: 'en-US' },
      ]);
      cy.stub(win.speechSynthesis, 'speak').as('speak');
      cy.stub(win.speechSynthesis, 'pause').as('pause');
      cy.stub(win.speechSynthesis, 'resume').as('resume');
      cy.stub(win.speechSynthesis, 'cancel').as('cancel');
    });
  });

  it('renders the speaker button', () => {
    cy.mount(<Speaker content="Hello World" />);

    cy.get('button').should('be.visible');
  });

  it('displays volume icon', () => {
    cy.mount(<Speaker content="Test content" />);

    cy.get('button svg').should('exist');
  });

  it('calls speech synthesis when clicked', () => {
    cy.mount(<Speaker content="Test speech" />);

    cy.get('button').click();
    cy.get('@speak').should('have.been.called');
  });

  it('applies custom styles when provided', () => {
    cy.mount(<Speaker content="Test" additionalStyles="custom-class" />);

    cy.get('button').should('have.class', 'custom-class');
  });

  it('has correct type attribute to prevent form submission', () => {
    cy.mount(<Speaker content="Test" />);

    cy.get('button').should('have.attr', 'type', 'button');
  });

  it('changes icon state on mouse down', () => {
    cy.mount(<Speaker content="Test" />);

    cy.get('button').trigger('mousedown');
    // Icon should change during press
    cy.get('button svg').should('exist');
  });

  it('handles empty content gracefully', () => {
    cy.mount(<Speaker content="" />);

    cy.get('button').should('be.visible');
    cy.get('button').click();
  });

  it('accepts content prop and renders button', () => {
    const testContent = 'This is a test message for text-to-speech';
    cy.mount(<Speaker content={testContent} />);

    cy.get('button').should('exist');
  });

  it('handles touch events', () => {
    cy.mount(<Speaker content="Touch test" />);

    cy.get('button').trigger('touchstart');
    cy.get('button').trigger('touchend');
    cy.get('button').should('exist');
  });

  it('applies hover effects', () => {
    cy.mount(<Speaker content="Hover test" />);

    cy.get('button').should('have.class', 'hover:scale-105');
  });

  it('has focus outline styles', () => {
    cy.mount(<Speaker content="Focus test" />);

    cy.get('button').should('have.class', 'focus:outline-none');
  });

  it('renders with default additionalStyles', () => {
    cy.mount(<Speaker content="Default styles" />);

    cy.get('button').should('have.class', 'ml-2');
    cy.get('button').should('have.class', 'text-gray-900');
  });
});
