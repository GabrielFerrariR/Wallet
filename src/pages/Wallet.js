import React from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/lib/connect/connect';
import { fetchCurrencies } from '../actions';
import ExpenseForm from '../components /ExpenseForm';
import ExpenseTable from '../components /ExpenseTable';

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
    const { userEmail, expenses } = this.props;
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
        <ExpenseForm />
        <table style={ { width: '100%' } }>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            { expenses.map((expense) => (
              <ExpenseTable key={ expense.id } expense={ expense } />))}
          </tbody>
        </table>
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
