import React, { Component } from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/lib/connect/connect';
import { fetchAndAddExpense } from '../actions';

const alimentacao = 'Alimentação';
const defaultState = {
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: alimentacao,
};

class ExpenseForm extends Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: alimentacao,
    };
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  }

  onSubmitClick = () => {
    const { expenseDispatch } = this.props;
    this.setState((prev) => ({
      id: prev.id + 1,
    }));
    expenseDispatch(this.state);
    this.setState(defaultState);
  }

  render() {
    const { currencyList } = this.props;
    const { value, description } = this.state;
    return (
      <section>
        <input
          type="text"
          data-testid="value-input"
          name="value"
          value={ value }
          onChange={ this.handleChange }
        />
        <input
          type="text"
          data-testid="description-input"
          name="description"
          value={ description }
          onChange={ this.handleChange }
        />
        <label htmlFor="currency">
          Moeda
          <select name="currency" id="currency" onChange={ this.handleChange }>
            { currencyList.map((curr) => (
              <option key={ curr } value={ curr }>
                {curr}
              </option>))}
          </select>
        </label>
        <select
          name="method"
          id="payment"
          data-testid="method-input"
          onChange={ this.handleChange }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
        <select
          name="tag"
          id="tag"
          data-testid="tag-input"
          onChange={ this.handleChange }
        >
          <option value="Alimentação ">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
        <button
          type="button"
          onClick={ this.onSubmitClick }
        >
          Adicionar despesa
        </button>
      </section>
    );
  }
}
const mapStateToProps = (state) => ({
  currencyList: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  expenseDispatch: (payload) => dispatch(fetchAndAddExpense(payload)),
});

ExpenseForm.propTypes = {
  currencyList: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
