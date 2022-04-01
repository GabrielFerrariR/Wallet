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

  expensesSum = () => {
    const { expenses } = this.props;
    return (expenses
      .map((expense) => expense.exchangeRates[expense.currency].ask * expense.value)
      .reduce((acc, value) => acc + value, 0)).toFixed(2);
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
          <span data-testid="total-field">
            { this.expensesSum() }
          </span>
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
  expenses: state.wallet.expenses,
});
Wallet.propTypes = {
  userEmail: PropTypes.string,
}.isRequired;
export default connect(mapStateToProps, null)(Wallet);
