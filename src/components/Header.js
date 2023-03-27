import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FaCoins, FaUserCircle } from 'react-icons/fa';
import header from '../images/trybewallet-expenses.png';

class Header extends Component {
  render() {
    const { email, expenses, editor } = this.props;

    return (
      <header
        className="flex flex-col pt-4
      items-center gap-1 w-screen md:w-[100%] drop-shadow-md"
      >
        <img
          src={ header }
          alt="TrybeWallet"
          className="w-[60%] md:w-[60%] drop-shadow-xl"
        />

        <h1 className="text-4xl font-semibold pb-2">TrybeWallet</h1>

        <div
          className="flex flex-col bg-gray-300 gap-3 py-3 mb-6 mt-1
      rounded-2xl w-[80%] drop-shadow-md"
        >
          <div
            className="flex items-center flex-wrap justify-between px-4 gap-4
          w-[100%] drop-shadow-md"
          >
            <FaUserCircle className="block" />
            <span
              className="text-lg font-light"
              data-testid="email-field"
            >
              { email }
            </span>
          </div>

          <div
            className="flex items-center justify-between px-4 gap-4
          flex-wrap w-[100%] drop-shadow-md"
          >
            <FaCoins className="block" />
            <span
              className="text-3xl font-semibold"
              data-testid="total-field"
            >
              R$
              {' '}
              { expenses
                .map((
                  { value, exchangeRates, currency },
                ) => exchangeRates[currency].ask * value)
                .reduce((acc, curr) => acc + curr, 0).toFixed(2) }
            </span>
            <h6 style={ { display: 'none' } }>{ editor }</h6>
            {/* <span data-testid="header-currency-field">BRL</span> */}
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = ({
  email: PropTypes.string,
}).isRequired;

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
  editor: state.wallet.editor,
});

export default connect(mapStateToProps)(Header);
