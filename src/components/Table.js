/* eslint-disable react/jsx-max-depth */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { deleteExpense, editExpense } from '../redux/actions';

class Table extends Component {
  render() {
    const { dispatch, expenses, editor } = this.props;
    const thClassName = 'p-2 w-32 md:w-[11.11%] font-normal flex justify-center';
    const tdClassName = 'p-2 w-32 md:w-[11.11%] font-light flex justify-center';

    return (
      <div
        className="bg-gray-200 md:h-screen w-screen
      md:min-w-[950px] pb-12 overflow-x-scroll md:overflow-x-hidden"
      >
        <h1
          className="text-3xl p-6 drop-shadow-md
        uppercase tracking-wide font-light"
        >
          Tabela de Despesas
        </h1>

        <table
          className="block md:flex md:flex-col"
        >
          <thead
            className="bg-gray-300 rounded-2xl mx-6 mb-4 drop-shadow-md"
          >
            <tr
              className="flex justify-evenly items-center
            uppercase px-2 drop-shadow-md"
            >
              <th className={ thClassName }>Descrição</th>
              <th className={ thClassName }>Tag</th>
              <th className={ thClassName }>Método de pagamento</th>
              <th className={ thClassName }>Valor</th>
              <th className={ thClassName }>Moeda</th>
              <th className={ thClassName }>Câmbio utilizado</th>
              <th className={ thClassName }>Valor convertido</th>
              <th className={ thClassName }>Moeda de conversão</th>
              <th className={ thClassName }>
                Editar
                <br />
                Excluir
              </th>
            </tr>
          </thead>

          <tbody className="bg-blue-300 rounded-2xl mx-6 mb-4 drop-shadow-md">
            { expenses && expenses.map((expense) => (
              <tr
                key={ expense.id }
                className="flex justify-evenly items-center px-2 drop-shadow-md"
              >
                <td className={ tdClassName }>{ expense.description }</td>
                <td className={ tdClassName }>{ expense.tag }</td>
                <td className={ tdClassName }>{ expense.method }</td>
                <td className={ tdClassName }>
                  {
                    Number(expense.value).toFixed(2)
                  }
                </td>
                <td className={ tdClassName }>
                  {
                    expense.exchangeRates[expense.currency].name
                  }
                </td>
                <td className={ tdClassName }>
                  {
                    Number(expense.exchangeRates[expense.currency].ask)
                      .toFixed(2)
                  }
                </td>
                <td className={ tdClassName }>
                  {
                    Number(expense.value * expense.exchangeRates[expense.currency].ask)
                      .toFixed(2)
                  }
                </td>
                <td className={ tdClassName }>Real</td>
                <td className={ tdClassName }>
                  <button
                    data-testid="edit-btn"
                    type="button"
                    onClick={ () => dispatch(editExpense(expense.id)) }
                  >
                    <FaEdit className="w-10" />
                  </button>

                  <button
                    data-testid="delete-btn"
                    type="button"
                    onClick={ () => dispatch(deleteExpense(expense.id)) }
                    disabled={ editor }
                  >
                    <FaTrashAlt className="w-10" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape()),
  dispatch: PropTypes.func,
}.isRequired;

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  editor: state.wallet.editor,
});

export default connect(mapStateToProps)(Table);
