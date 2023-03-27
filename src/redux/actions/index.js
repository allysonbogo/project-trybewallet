import getCurrencies from '../../services/currenciesAPI';

// ACTIONS TYPES
export const USER = 'USER';
export const WALLET = 'WALLET';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const REPLACE_EXPENSE = 'REPLACE_EXPENSE';

// ACTIONS CREATORS
export const userData = (user) => ({
  type: USER,
  payload: user,
});

export const walletData = (wallet) => ({
  type: WALLET,
  payload: wallet,
});

export const actionAddExpense = (expense) => ({
  type: ADD_EXPENSE,
  payload: expense,
});

export const deleteExpense = (id) => ({
  type: DELETE_EXPENSE,
  payload: id,
});

export const editExpense = (id) => ({
  type: EDIT_EXPENSE,
  payload: id,
});

export const actionReplaceExpense = (expenses) => ({
  type: REPLACE_EXPENSE,
  payload: expenses,
});

export const fetchCurrencies = () => async (dispatch) => {
  const request = await getCurrencies();
  dispatch(walletData(request));
};

// Inspirado no código do Vinicius Coelho
export const addExpense = (expense) => async (dispatch) => {
  const request = await fetch('https://economia.awesomeapi.com.br/json/all');
  const response = await request.json();
  delete response.USDT;
  expense.exchangeRates = response;
  dispatch(actionAddExpense(expense));
};

export const replaceExpense = (expenses, localState, idToEdit) => (dispatch) => {
  const { exchangeRates } = expenses.find(({ id }) => id === idToEdit);
  const editedExpense = { ...localState, exchangeRates, id: idToEdit };
  const indexToEdit = expenses.findIndex(({ id }) => id === idToEdit);
  expenses.splice(indexToEdit, 1, editedExpense);
  dispatch(actionReplaceExpense(expenses));
};
