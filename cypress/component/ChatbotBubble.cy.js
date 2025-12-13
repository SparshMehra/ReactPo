import React from 'react';
import ChatbotBubble from '../../src/components/chatbot/ChatbotBubble';
import '../../src/index.css';
import '../../src/components/chatbot/Chatbot.css';

describe('ChatbotBubble Component', () => {
  it('renders the chatbot bubble button', () => {
    cy.mount(<ChatbotBubble />);

    cy.get('.chatbot-bubble').should('be.visible');
  });

  it('displays the chat icon', () => {
    cy.mount(<ChatbotBubble />);

    cy.get('.chatbot-icon').should('exist');
  });

  it('opens chatbot window when bubble is clicked', () => {
    cy.mount(<ChatbotBubble />);

    cy.get('.chatbot-bubble').click();

    // ChatbotWindow should be rendered
    cy.get('.chatbot-bubble').should('have.class', 'hidden');
  });

  it('hides bubble when chatbot window is open', () => {
    cy.mount(<ChatbotBubble />);

    cy.get('.chatbot-bubble').should('not.have.class', 'hidden');
    cy.get('.chatbot-bubble').click();
    cy.get('.chatbot-bubble').should('have.class', 'hidden');
  });

  it('shows bubble when chatbot window is closed', () => {
    cy.mount(<ChatbotBubble />);

    // Open chatbot
    cy.get('.chatbot-bubble').click();
    cy.get('.chatbot-bubble').should('have.class', 'hidden');

    // Close chatbot by clicking close button (correct class name)
    cy.get('.chatbot-close-btn').click();
    cy.get('.chatbot-bubble').should('not.have.class', 'hidden');
  });

  it('toggles chatbot window state correctly', () => {
    cy.mount(<ChatbotBubble />);

    // Initially closed
    cy.get('.chatbot-bubble').should('be.visible');

    // Open
    cy.get('.chatbot-bubble').click();
    cy.get('.chatbot-bubble').should('have.class', 'hidden');

    // Close (correct class name)
    cy.get('.chatbot-close-btn').click();
    cy.get('.chatbot-bubble').should('not.have.class', 'hidden');
  });

  it('renders SVG icon with correct attributes', () => {
    cy.mount(<ChatbotBubble />);

    cy.get('.chatbot-icon')
      .should('have.attr', 'viewBox', '0 0 24 24')
      .and('have.attr', 'stroke', 'currentColor');
  });

  it('bubble is clickable', () => {
    cy.mount(<ChatbotBubble />);

    cy.get('.chatbot-bubble').click();
    // Should toggle state (bubble should be hidden)
    cy.get('.chatbot-bubble').should('have.class', 'hidden');
  });

  it('renders ChatbotWindow when opened', () => {
    cy.mount(<ChatbotBubble />);

    // Initially ChatbotWindow should not be rendered
    cy.get('.chatbot-window').should('not.exist');

    // Click bubble to open
    cy.get('.chatbot-bubble').click();

    // ChatbotWindow should now be rendered
    cy.get('.chatbot-window').should('exist');
  });

  it('does not render ChatbotWindow initially', () => {
    cy.mount(<ChatbotBubble />);

    cy.get('.chatbot-window').should('not.exist');
  });
});
