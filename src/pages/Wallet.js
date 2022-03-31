import React from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/lib/connect/connect';
import { fetchCurrencies } from '../actions';
import ExpenseForm from '../components /ExpenseForm';

class Wallet extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  render() {
    const { userEmail } = this.props;
    return (
      <div>
        <header>
          <span data-testid="email-field">
            E-mail:
            { userEmail }
          </span>
          <span data-testid="total-field">Despesa Total: 0</span>
          <span data-testid="header-currency-field">BRL</span>
        </header>
        <main>
          <ExpenseForm />
        </main>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  userEmail: state.user.email,
});
Wallet.propTypes = {
  userEmail: PropTypes.string,
}.isRequired;
export default connect(mapStateToProps, null)(Wallet);
