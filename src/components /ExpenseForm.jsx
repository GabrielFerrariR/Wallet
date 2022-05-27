import React, { Component } from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/lib/connect/connect';
import { fetchAndAddExpense, editExpense, toggle } from '../actions';
import ExpenseTable from './ExpenseTable';

const currency = 'currency';
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

  onExpenseEdit = () => {
    const { editDispatch, expenseToEdit, toggleToAdd } = this.props;

    editDispatch(this.state, expenseToEdit);
    this.setState(defaultState);
    toggleToAdd();
  }

  render() {
    const { currencyList, expenses, isEditing } = this.props;
    const { value, description } = this.state;
    return (
      <section>
        <div className="d-flex justify-content-evenly">
          <div className="input-group mb-3">
            <span className="input-group-text">$</span>
            <input
              className="form-control"
              type="number"
              data-testid="value-input"
              name="value"
              value={ value }
              placeholder="Valor"
              onChange={ this.handleChange }
            />
          </div>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              data-testid="description-input"
              name="description"
              placeholder="Descrição da despesa"
              value={ description }
              onChange={ this.handleChange }
            />
          </div>
          <div className="input-group mb-3">
            <span>
              Moeda
            </span>
            <select
              name="currency"
              id={ currency }
              className="form-select-sm"
              onChange={ this.handleChange }
              data-testid="currency-input"
            >
              { currencyList.map((curr) => (
                <option key={ curr } value={ curr }>
                  {curr}
                </option>))}
            </select>
          </div>
          <div className="input-group mb-3">
            <select
              name="method"
              id="payment"
              className="form-select-sm"
              data-testid="method-input"
              onChange={ this.handleChange }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </div>
          <div className="input-group mb-3">
            <select
              name="tag"
              id="tag"
              data-testid="tag-input"
              className="form=select"
              onChange={ this.handleChange }
            >
              <option value="Alimentação ">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </div>
          <button
            type="button"
            onClick={ isEditing ? this.onSubmitClick : this.onExpenseEdit }
            className={ isEditing ? 'btn btn-info' : 'btn btn-warning' }
          >
            { isEditing ? 'Adicionar despesa' : 'Editar despesa'}
          </button>
        </div>
        <table style={ { width: '100%' } } className="table table-warning table-striped">
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
            { (expenses) && expenses.map((expense) => (
              <ExpenseTable
                key={ expense.id }
                expense={ expense }
              />))}
          </tbody>
        </table>
      </section>

    );
  }
}
const mapStateToProps = (state) => ({
  currencyList: state.wallet.currencies,
  expenses: state.wallet.expenses,
  isEditing: state.edit.toggleAdd,
  expenseToEdit: state.edit.expenseToEdit,
});

const mapDispatchToProps = (dispatch) => ({
  expenseDispatch: (payload) => dispatch(fetchAndAddExpense(payload)),
  editDispatch: (payload, expenseToEdit) => dispatch(editExpense(payload, expenseToEdit)),
  toggleToAdd: () => dispatch(toggle()),
});

ExpenseForm.propTypes = {
  currencyList: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
