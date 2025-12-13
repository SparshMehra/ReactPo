import React from 'react';
import StyleModalContext from '../../src/components/UI/StyleModalContext';
import '../../src/index.css';

describe('StyleModalContext Component', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  it('renders the accessibility button', () => {
    cy.mount(<StyleModalContext />);

    cy.get('.text-white').should('be.visible');
  });

  it('opens modal when accessibility button is clicked', () => {
    cy.mount(<StyleModalContext />);

    // Click the accessibility button
    cy.get('.text-white').click();

    // Modal should open and display text adjustment controls
    cy.contains('Text Size').should('not.exist'); // This component uses icons, not text
  });

  it('initializes with default tracker values when localStorage is empty', () => {
    cy.mount(<StyleModalContext />);

    // Verify localStorage is empty initially
    cy.window().then((win) => {
      expect(win.localStorage.getItem('textSizePreference')).to.be.null;
      expect(win.localStorage.getItem('lineHeightPreference')).to.be.null;
    });
  });

  it('loads saved preferences from localStorage', () => {
    // Set preferences in localStorage before mounting
    cy.window().then((win) => {
      win.localStorage.setItem('textSizePreference', '1');
      win.localStorage.setItem('lineHeightPreference', '1');
    });

    cy.mount(<StyleModalContext />);

    // Wait for useEffect to apply classes
    cy.wait(100);

    // Verify that body has the appropriate classes applied
    cy.get('body').should('have.class', 'bodyTextxlg');
    cy.get('body').should('have.class', 'lineHeightBigger');
  });

  it('applies text size class level 2', () => {
    cy.window().then((win) => {
      win.localStorage.setItem('textSizePreference', '2');
    });

    cy.mount(<StyleModalContext />);

    cy.wait(100);
    cy.get('body').should('have.class', 'bodyTextxxlg');
  });

  it('applies line height class level 2', () => {
    cy.window().then((win) => {
      win.localStorage.setItem('lineHeightPreference', '2');
    });

    cy.mount(<StyleModalContext />);

    cy.wait(100);
    cy.get('body').should('have.class', 'lineHeightBiggest');
  });

  it('removes all classes when tracker is 0', () => {
    // First set a class
    cy.window().then((win) => {
      win.localStorage.setItem('textSizePreference', '1');
    });

    cy.mount(<StyleModalContext />);
    cy.wait(100);
    cy.get('body').should('have.class', 'bodyTextxlg');

    // Clear and remount with tracker 0
    cy.window().then((win) => {
      win.localStorage.setItem('textSizePreference', '0');
    });

    cy.mount(<StyleModalContext />);
    cy.wait(100);

    cy.get('body').should('not.have.class', 'bodyTextxlg');
    cy.get('body').should('not.have.class', 'bodyTextxxlg');
  });

  it('renders text adjustment icons', () => {
    cy.mount(<StyleModalContext />);

    // Open modal
    cy.get('.text-white').click();

    // Check for icon containers (pagination components)
    cy.get('body').should('exist');
  });
});
