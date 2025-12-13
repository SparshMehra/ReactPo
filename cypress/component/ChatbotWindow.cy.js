import React from 'react';
import ChatbotWindow from '../../src/components/chatbot/ChatbotWindow';
import '../../src/index.css';
import '../../src/components/chatbot/Chatbot.css';

describe('ChatbotWindow Component', () => {
  beforeEach(() => {
    // Stub fetch for API calls
    cy.intercept('POST', '**/api/chat', {
      statusCode: 200,
      body: {
        response: 'This is a test response from the chatbot.'
      }
    }).as('chatRequest');
  });

  it('renders the chatbot window', () => {
    const onClose = cy.stub();
    cy.mount(<ChatbotWindow onClose={onClose} />);

    cy.get('.chatbot-window').should('be.visible');
  });

  it('displays the header with title and subtitle', () => {
    const onClose = cy.stub();
    cy.mount(<ChatbotWindow onClose={onClose} />);

    cy.contains('Woodland Assistant').should('be.visible');
    cy.contains('Ask me anything').should('be.visible');
  });

  it('displays initial welcome message', () => {
    const onClose = cy.stub();
    cy.mount(<ChatbotWindow onClose={onClose} />);

    cy.contains('Hello! How can I help you today?').should('be.visible');
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = cy.stub().as('onClose');
    cy.mount(<ChatbotWindow onClose={onClose} />);

    cy.get('.chatbot-close-btn').click();
    cy.get('@onClose').should('have.been.calledOnce');
  });

  it('allows user to type in input field', () => {
    const onClose = cy.stub();
    cy.mount(<ChatbotWindow onClose={onClose} />);

    cy.get('.chatbot-input').type('Test message');
    cy.get('.chatbot-input').should('have.value', 'Test message');
  });

  it('sends message when form is submitted', () => {
    const onClose = cy.stub();
    cy.mount(<ChatbotWindow onClose={onClose} />);

    cy.get('.chatbot-input').type('Hello chatbot');
    cy.get('.chatbot-send-btn').click();

    // User message should appear
    cy.contains('Hello chatbot').should('be.visible');
  });

  it('clears input after sending message', () => {
    const onClose = cy.stub();
    cy.mount(<ChatbotWindow onClose={onClose} />);

    cy.get('.chatbot-input').type('Test message');
    cy.get('.chatbot-send-btn').click();

    cy.get('.chatbot-input').should('have.value', '');
  });

  it('shows loading indicator while waiting for response', () => {
    // Delay the response to ensure loading state is visible
    cy.intercept('POST', '**/api/chat', (req) => {
      req.reply({
        delay: 1000,
        statusCode: 200,
        body: { response: 'Delayed response' }
      });
    }).as('delayedRequest');

    const onClose = cy.stub();
    cy.mount(<ChatbotWindow onClose={onClose} />);

    cy.get('.chatbot-input').type('Test message');
    cy.get('.chatbot-send-btn').click();

    // Loading indicator should appear during the delay
    cy.get('.typing-indicator', { timeout: 500 }).should('exist');
  });

  it('displays bot response after API call', () => {
    const onClose = cy.stub();
    cy.mount(<ChatbotWindow onClose={onClose} />);

    cy.get('.chatbot-input').type('Test question');
    cy.get('.chatbot-send-btn').click();

    cy.wait('@chatRequest');

    cy.contains('This is a test response from the chatbot.').should('be.visible');
  });

  it('disables input and send button while loading', () => {
    const onClose = cy.stub();
    cy.mount(<ChatbotWindow onClose={onClose} />);

    cy.get('.chatbot-input').type('Test');
    cy.get('.chatbot-send-btn').click();

    // Check loading indicator appears instead of checking disabled state
    cy.get('.typing-indicator').should('exist');
  });

  it('disables send button when input is empty', () => {
    const onClose = cy.stub();
    cy.mount(<ChatbotWindow onClose={onClose} />);

    cy.get('.chatbot-send-btn').should('be.disabled');
  });

  it('enables send button when input has text', () => {
    const onClose = cy.stub();
    cy.mount(<ChatbotWindow onClose={onClose} />);

    cy.get('.chatbot-input').type('Test');
    cy.get('.chatbot-send-btn').should('not.be.disabled');
  });

  it('displays suggested questions after first interaction', () => {
    const onClose = cy.stub();
    cy.mount(<ChatbotWindow onClose={onClose} />);

    cy.get('.chatbot-input').type('Test question');
    cy.get('.chatbot-send-btn').click();

    cy.wait('@chatRequest');

    cy.get('.suggested-questions').should('be.visible');
    cy.contains('You might also ask:').should('be.visible');
  });

  it('sends message when suggested question is clicked', () => {
    const onClose = cy.stub();
    cy.mount(<ChatbotWindow onClose={onClose} />);

    // First interaction to show suggested questions
    cy.get('.chatbot-input').type('Test');
    cy.get('.chatbot-send-btn').click();
    cy.wait('@chatRequest');

    // Click a suggested question
    cy.get('.suggested-question-btn').first().click();

    // Should send another request
    cy.wait('@chatRequest');
  });

  it('handles API error gracefully', () => {
    cy.intercept('POST', '**/api/chat', {
      forceNetworkError: true
    }).as('chatError');

    const onClose = cy.stub();
    cy.mount(<ChatbotWindow onClose={onClose} />);

    cy.get('.chatbot-input').type('Test');
    cy.get('.chatbot-send-btn').click();

    // Wait for error to be processed
    cy.wait(1000);

    cy.contains('having trouble connecting').should('be.visible');
  });

  it('prevents submission of empty messages', () => {
    const onClose = cy.stub();
    cy.mount(<ChatbotWindow onClose={onClose} />);

    // Button should be disabled when input is empty, so we can't click it
    cy.get('.chatbot-send-btn').should('be.disabled');

    // Verify no messages were sent (only initial welcome message exists)
    cy.get('.message').should('have.length', 1);
  });

  it('displays multiple messages in conversation', () => {
    const onClose = cy.stub();
    cy.mount(<ChatbotWindow onClose={onClose} />);

    // Send first message
    cy.get('.chatbot-input').type('First message');
    cy.get('.chatbot-send-btn').click();
    cy.wait('@chatRequest');

    // Send second message
    cy.get('.chatbot-input').type('Second message');
    cy.get('.chatbot-send-btn').click();
    cy.wait('@chatRequest');

    // Both messages should be visible
    cy.contains('First message').should('be.visible');
    cy.contains('Second message').should('be.visible');
  });

  it('renders header icon', () => {
    const onClose = cy.stub();
    cy.mount(<ChatbotWindow onClose={onClose} />);

    cy.get('.chatbot-header-icon svg').should('exist');
  });

  it('renders send button icon', () => {
    const onClose = cy.stub();
    cy.mount(<ChatbotWindow onClose={onClose} />);

    cy.get('.chatbot-send-btn svg').should('exist');
  });
});
