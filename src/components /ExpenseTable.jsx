import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ExpenseTable extends Component {
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
        <td>editar</td>
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
export default ExpenseTable;
