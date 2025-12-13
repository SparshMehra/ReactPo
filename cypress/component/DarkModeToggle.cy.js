//Author: Sadikshya Oli A00457938
import React from 'react';
import DarkModeToggle from '../../src/components/UI/DarkModeToggle';
import '../../src/index.css';

describe('DarkModeToggle Component', () => {
  it('renders with light mode icon when dark is false', () => {
    const toggleDarkMode = cy.stub();

    cy.mount(<DarkModeToggle toggleDarkMode={toggleDarkMode} dark={false} />);

    cy.get('button').should('be.visible');
    cy.get('button').should('have.attr', 'aria-label', 'Switch to dark mode');
  });

  it('renders with dark mode icon when dark is true', () => {
    const toggleDarkMode = cy.stub();

    cy.mount(<DarkModeToggle toggleDarkMode={toggleDarkMode} dark={true} />);

    cy.get('button').should('be.visible');
    cy.get('button').should('have.attr', 'aria-label', 'Switch to light mode');
  });

  it('calls toggleDarkMode when clicked', () => {
    const toggleDarkMode = cy.stub().as('toggleDarkMode');

    cy.mount(<DarkModeToggle toggleDarkMode={toggleDarkMode} dark={false} />);

    cy.get('button').click();
    cy.get('@toggleDarkMode').should('have.been.calledOnce');
  });

  it('has correct title attribute for light mode', () => {
    const toggleDarkMode = cy.stub();

    cy.mount(<DarkModeToggle toggleDarkMode={toggleDarkMode} dark={false} />);

    cy.get('button').should('have.attr', 'title', 'Switch to dark mode');
  });

  it('has correct title attribute for dark mode', () => {
    const toggleDarkMode = cy.stub();

    cy.mount(<DarkModeToggle toggleDarkMode={toggleDarkMode} dark={true} />);

    cy.get('button').should('have.attr', 'title', 'Switch to light mode');
  });

  it('has proper accessibility attributes', () => {
    const toggleDarkMode = cy.stub();

    cy.mount(<DarkModeToggle toggleDarkMode={toggleDarkMode} dark={false} />);

    cy.get('button').should('have.attr', 'aria-label');
  });

  it('toggles multiple times correctly', () => {
    const toggleDarkMode = cy.stub().as('toggleDarkMode');

    cy.mount(<DarkModeToggle toggleDarkMode={toggleDarkMode} dark={false} />);

    cy.get('button').click();
    cy.get('button').click();
    cy.get('button').click();

    cy.get('@toggleDarkMode').should('have.callCount', 3);
  });
});
