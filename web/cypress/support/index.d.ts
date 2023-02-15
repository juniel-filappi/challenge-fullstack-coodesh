import './commands';

type Method = 'POST' | 'GET' | 'DELETE';

declare global {
  namespace Cypress {
    interface Chainable {
      dataCy(value: string): Chainable<Element>;
    }
  }
}