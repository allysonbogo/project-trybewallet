import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies, addExpense, replaceExpense } from '../redux/actions';
import Select from './Select';

const INITIAL_STATE = {
  id: 0,
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
};

const METHOD_LIST = [
  'Dinheiro',
  'Cartão de crédito',
  'Cartão de débito',
];

const TAG_LIST = [
  'Alimentação',
  'Lazer',
  'Trabalho',
  'Transporte',
  'Saúde',
];

class WalletForm extends Component {
  state = INITIAL_STATE;

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { dispatch, currencies, editor, expenses, idToEdit } = this.props;
    const editingExpense = expenses.find(({ id }) => id === idToEdit) || '';

    return (
      <div
        className="flex flex-col bg-gray-300 gap-3 pb-4
      rounded-2xl w-[80%] drop-shadow-md"
      >
        <div
          className="text-xl drop-shadow-md uppercase bg-blue-300 rounded-2xl
        p-3 h-20 flex items-center justify-center"
        >
          { editor ? (
            <h4>
              Editando a despesa:
              <br />
              { editingExpense.description }
            </h4>
          ) : (
            <h4>
              Adicionar uma
              <br />
              despesa
            </h4>
          ) }
        </div>

        <form
          className="flex flex-wrap font-light justify-center gap-4 m-2"
          onSubmit={ (e) => {
            e.preventDefault();
            if (!editor) {
              dispatch(addExpense(this.state));
              this.setState((current) => ({ ...INITIAL_STATE, id: current.id + 1 }));
              return;
            }
            if (editor) {
              dispatch(replaceExpense(expenses, this.state, idToEdit));
              this.setState((current) => ({ ...INITIAL_STATE, id: current.id }));
            }
          } }
        >
          <input
            type="number"
            name="value"
            value={ value }
            onChange={ this.handleChange }
            data-testid="value-input"
            placeholder="Valor"
            required
            className="bg-gray-200 w-[100%] rounded-xl p-1 mx-8 text-center"
          />

          <input
            type="text"
            name="description"
            value={ description }
            onChange={ this.handleChange }
            data-testid="description-input"
            placeholder="Descrição"
            required
            className="bg-gray-200 w-[100%] rounded-xl p-1 mx-8 text-center"
          />

          <Select
          // defaultOption="Selecione"
          // label="Moeda"
            name="currency"
            value={ currency }
            onChange={ this.handleChange }
            options={ currencies }
            className="bg-gray-200 w-[100%] text-center rounded-xl p-1 pl-2 mx-8"
            dataTestId="currency-input"
          />

          <Select
          // defaultOption="Selecione"
          // label="Método de pagamento"
            name="method"
            value={ method }
            onChange={ this.handleChange }
            options={ METHOD_LIST }
            className="bg-gray-200 w-[100%] text-center rounded-xl p-1 pl-2 mx-8"
            dataTestId="method-input"
          />

          <Select
          // defaultOption="Selecione"
          // label="Categoria"
            name="tag"
            value={ tag }
            onChange={ this.handleChange }
            options={ TAG_LIST }
            className="bg-gray-200 w-[100%] text-center rounded-xl p-1 pl-2 mx-8"
            dataTestId="tag-input"
          />

          <button
            type="submit"
            className="bg-blue-300 font-medium rounded-xl p-1 w-[100%] uppercase
             border-gray-300 border-2 hover:border-black hover:border-2 mx-8
             hover:bg-lime-500 duration-200"
          >
            { editor ? 'Editar despesa' : 'Adicionar despesa' }
          </button>
        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string),
  editor: PropTypes.bool.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape()),
  idToEdit: PropTypes.number.isRequired,
};

WalletForm.defaultProps = {
  currencies: [],
  expenses: [],
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  editor: state.wallet.editor,
  expenses: state.wallet.expenses,
  idToEdit: state.wallet.idToEdit,
});

export default connect(mapStateToProps)(WalletForm);
