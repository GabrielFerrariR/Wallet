import React, { Component } from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/lib/connect/connect';
import { removeExpense, toggle } from '../actions';

class ExpenseTable extends Component {
  onDeleteButtonClick = () => {
    const { expense, deleteLine } = this.props;
    deleteLine(expense);
  }

  onEditButtonClick = () => {
    const { expense, toggleToEdit } = this.props;
    toggleToEdit(expense);
  }

  render() {
    const { expense } = this.props;
    const { description, tag, method, value, exchangeRates, currency } = expense;
    const { ask, name } = exchangeRates[currency];
    return (
      <tr>
        <td>{description}</td>
        <td>{ tag }</td>
        <td>{ method }</td>
        <td>{ Number(value).toFixed(2) }</td>
        <td>{ name }</td>
        <td>{ Number(ask).toFixed(2) }</td>
        <td>{ (ask * value).toFixed(2) }</td>
        <td>Real</td>
        <td>
          <button
            type="button"
            data-testid="edit-btn"
            onClick={ this.onEditButtonClick }
          >
            Editar
          </button>
          <button
            type="button"
            data-testid="delete-btn"
            onClick={ this.onDeleteButtonClick }
          >
            Excluir
          </button>
        </td>
      </tr>
    );
  }
}
ExpenseTable.propTypes = {
  expense: PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.number,
    description: PropTypes.string,
  }),
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  deleteLine: (expense) => dispatch(removeExpense(expense)),
  toggleToEdit: (expense) => dispatch(toggle(expense)),
});

export default connect(null, mapDispatchToProps)(ExpenseTable);
