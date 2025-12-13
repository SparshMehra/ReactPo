import React from 'react';
import EventCard from '../../src/components/events/EventCard';
import '../../src/index.css';

describe('EventCard Component', () => {
  const mockEvent = {
    id: 1,
    title: 'Wildlife Photography Workshop',
    description: 'Learn to capture stunning wildlife moments in their natural habitat.',
    date: '2025-12-20',
    startTime: '09:00',
    location: 'National Park Visitor Center',
    category: 'guided-tour',
    difficulty: 'easy',
    capacity: 20,
    spotsAvailable: 10,
    imageUrl: 'https://example.com/image.jpg'
  };

  it('renders event card with all information', () => {
    const mockOnBookNow = cy.stub();
    const mockOnLearnMore = cy.stub();

    cy.mount(
      <EventCard
        event={mockEvent}
        onBookNow={mockOnBookNow}
        onLearnMore={mockOnLearnMore}
      />
    );

    cy.contains('Wildlife Photography Workshop').should('be.visible');
    cy.contains('Learn to capture stunning wildlife moments').should('be.visible');
    cy.contains('National Park Visitor Center').should('be.visible');
  });

  it('displays capacity information correctly', () => {
    const mockOnBookNow = cy.stub();
    const mockOnLearnMore = cy.stub();

    cy.mount(
      <EventCard
        event={mockEvent}
        onBookNow={mockOnBookNow}
        onLearnMore={mockOnLearnMore}
      />
    );

    cy.contains('10/20 spots').should('be.visible');
  });

  it('shows "Almost Full" badge when spots are low', () => {
    const almostFullEvent = { ...mockEvent, spotsAvailable: 3 };
    const mockOnBookNow = cy.stub();
    const mockOnLearnMore = cy.stub();

    cy.mount(
      <EventCard
        event={almostFullEvent}
        onBookNow={mockOnBookNow}
        onLearnMore={mockOnLearnMore}
      />
    );

    cy.contains('Almost Full!').should('be.visible');
  });

  it('shows "Fully Booked" badge and disables button when no spots available', () => {
    const fullEvent = { ...mockEvent, spotsAvailable: 0 };
    const mockOnBookNow = cy.stub();
    const mockOnLearnMore = cy.stub();

    cy.mount(
      <EventCard
        event={fullEvent}
        onBookNow={mockOnBookNow}
        onLearnMore={mockOnLearnMore}
      />
    );

    cy.contains('Fully Booked').should('be.visible');
    cy.contains('button', 'Fully Booked').should('be.disabled');
  });

  it('calls onBookNow when Book Now button is clicked', () => {
    const mockOnBookNow = cy.stub().as('onBookNow');
    const mockOnLearnMore = cy.stub();

    cy.mount(
      <EventCard
        event={mockEvent}
        onBookNow={mockOnBookNow}
        onLearnMore={mockOnLearnMore}
      />
    );

    cy.contains('button', 'Book Now').click();
    cy.get('@onBookNow').should('have.been.calledOnce');
  });

  it('calls onLearnMore when Learn More button is clicked', () => {
    const mockOnBookNow = cy.stub();
    const mockOnLearnMore = cy.stub().as('onLearnMore');

    cy.mount(
      <EventCard
        event={mockEvent}
        onBookNow={mockOnBookNow}
        onLearnMore={mockOnLearnMore}
      />
    );

    cy.contains('button', 'Learn More').click();
    cy.get('@onLearnMore').should('have.been.calledOnce');
  });

  it('displays difficulty level', () => {
    const mockOnBookNow = cy.stub();
    const mockOnLearnMore = cy.stub();

    cy.mount(
      <EventCard
        event={mockEvent}
        onBookNow={mockOnBookNow}
        onLearnMore={mockOnLearnMore}
      />
    );

    cy.contains('Difficulty').should('be.visible');
  });

  it('handles missing image gracefully', () => {
    const eventWithoutImage = { ...mockEvent, imageUrl: null };
    const mockOnBookNow = cy.stub();
    const mockOnLearnMore = cy.stub();

    cy.mount(
      <EventCard
        event={eventWithoutImage}
        onBookNow={mockOnBookNow}
        onLearnMore={mockOnLearnMore}
      />
    );

    cy.contains('Wildlife Photography Workshop').should('be.visible');
  });
});
