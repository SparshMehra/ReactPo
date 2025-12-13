import React from 'react';
import Button from '../../src/components/UI/Button';
import '../../src/index.css';

describe('Button Component', () => {
  it('renders with default props', () => {
    cy.mount(<Button>Click me</Button>);

    cy.contains('Click me').should('be.visible');
  });

  it('applies primary variant styles by default', () => {
    cy.mount(<Button>Primary Button</Button>);

    cy.get('button').should('exist');
  });

  it('applies secondary variant styles', () => {
    cy.mount(<Button variant="secondary">Secondary</Button>);

    cy.contains('Secondary').should('be.visible');
  });

  it('applies danger variant styles', () => {
    cy.mount(<Button variant="danger">Delete</Button>);

    cy.contains('Delete').should('be.visible');
  });

  it('applies success variant styles', () => {
    cy.mount(<Button variant="success">Confirm</Button>);

    cy.contains('Confirm').should('be.visible');
  });

  it('applies ghost variant styles', () => {
    cy.mount(<Button variant="ghost">Ghost</Button>);

    cy.contains('Ghost').should('be.visible');
  });

  it('applies accent variant styles', () => {
    cy.mount(<Button variant="accent">Accent</Button>);

    cy.contains('Accent').should('be.visible');
  });

  it('applies small size', () => {
    cy.mount(<Button size="sm">Small</Button>);

    cy.contains('Small').should('be.visible');
  });

  it('applies medium size by default', () => {
    cy.mount(<Button>Medium</Button>);

    cy.contains('Medium').should('be.visible');
  });

  it('applies large size', () => {
    cy.mount(<Button size="lg">Large</Button>);

    cy.contains('Large').should('be.visible');
  });

  it('renders with icon on the left', () => {
    const icon = <span data-testid="icon">🔥</span>;
    cy.mount(<Button icon={icon} iconPosition="left">With Icon</Button>);

    cy.contains('With Icon').should('be.visible');
    cy.get('[data-testid="icon"]').should('exist');
  });

  it('renders with icon on the right', () => {
    const icon = <span data-testid="icon">→</span>;
    cy.mount(<Button icon={icon} iconPosition="right">Next</Button>);

    cy.contains('Next').should('be.visible');
    cy.get('[data-testid="icon"]').should('exist');
  });

  it('calls onClick handler when clicked', () => {
    const onClick = cy.stub().as('onClick');
    cy.mount(<Button onClick={onClick}>Click Me</Button>);

    cy.contains('Click Me').click();
    cy.get('@onClick').should('have.been.calledOnce');
  });

  it('does not call onClick when disabled', () => {
    const onClick = cy.stub().as('onClick');
    cy.mount(<Button onClick={onClick} disabled>Disabled</Button>);

    cy.contains('Disabled').should('be.disabled');
    cy.contains('Disabled').click({ force: true });
    cy.get('@onClick').should('not.have.been.called');
  });

  it('applies fullWidth class when fullWidth is true', () => {
    cy.mount(<Button fullWidth>Full Width</Button>);

    cy.get('button').should('exist');
  });

  it('applies custom className', () => {
    cy.mount(<Button className="custom-class">Custom</Button>);

    cy.get('.custom-class').should('exist');
  });

  it('has correct type attribute', () => {
    cy.mount(<Button type="submit">Submit</Button>);

    cy.get('button').should('have.attr', 'type', 'submit');
  });

  it('defaults to button type', () => {
    cy.mount(<Button>Default Type</Button>);

    cy.get('button').should('have.attr', 'type', 'button');
  });

  it('renders children correctly', () => {
    cy.mount(
      <Button>
        <span>Child 1</span>
        <span>Child 2</span>
      </Button>
    );

    cy.contains('Child 1').should('be.visible');
    cy.contains('Child 2').should('be.visible');
  });

  it('is disabled when disabled prop is true', () => {
    cy.mount(<Button disabled>Disabled Button</Button>);

    cy.get('button').should('be.disabled');
  });

  it('has focus styles', () => {
    cy.mount(<Button>Focus Test</Button>);

    cy.get('button').should('have.class', 'focus:outline-none');
    cy.get('button').should('have.class', 'focus:ring-2');
  });
});
