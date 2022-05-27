import React from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/lib/connect/connect';
import { fetchCurrencies } from '../actions';
import ExpenseForm from '../components /ExpenseForm';
import wallet from '../et_wallet.svg';

class Wallet extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  expensesSum = () => {
    const { expenses } = this.props;
    if (expenses) {
      return (expenses
        .map((expense) => expense.exchangeRates[expense.currency].ask * expense.value)
        .reduce((acc, value) => acc + value, 0)).toFixed(2);
    }
    return 0;
  }

  render() {
    const { userEmail } = this.props;
    return (
      <div>
        <header className="d-flex justify-content-between p-3">
          <div className="d-flex">
            <img src={ wallet } alt="wallet" className="me-3" />
            <h4 data-testid="email-field">
              E-mail:
              { userEmail }
            </h4>
          </div>
          <div className="d-flex">
            <h5 data-testid="total-field">
              { this.expensesSum() }
            </h5>
            <h5 data-testid="header-currency-field">BRL</h5>
          </div>
        </header>
        <ExpenseForm />
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
