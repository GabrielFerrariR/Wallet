import React from 'react';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <header>
          <span data-testid="email-field">E-mail:</span>
          <span data-testid="total-field">Despesa Total:</span>
          <span data-test-id="header-currency-field">0</span>
        </header>
      </div>
    )
  }
}

export default Wallet;
