import React, { Component } from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/lib/connect/connect';

class ExpenseForm extends Component {
  constructor() {
    super();
    this.state = {
      // expenseValue: '',
      // description: '',
      // currency: '',
      // paymentMethod: '',
      // tag: '',
    };
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  }

  render() {
    const { currencyList } = this.props;
    return (
      <section>
        <input
          type="text"
          data-testid="value-input"
        />
        <input
          type="text"
          data-testid="description-input"
        />
        <label htmlFor="currency">
          Moeda
          <select name="currency" id="currency">
            { currencyList.map((currency) => (
              <option key={ currency } value={ currency }>
                {currency}
              </option>))}
          </select>
        </label>
        <select name="paymentMethod" id="payment" data-testid="method-input">
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
        <select name="tag" id="tag" data-testid="tag-input">
          <option value="Alimentação ">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </section>
    );
  }
}
const mapStateToProps = (state) => ({
  currencyList: state.wallet.currencies,
});

ExpenseForm.propTypes = {
  currencyList: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps, null)(ExpenseForm);
