import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userData } from '../redux/actions';
import login from '../images/trybewallet-login.png';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  render() {
    const { email, password } = this.state;
    const { history, dispatch } = this.props;
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const passwordLength = 5;

    return (
      <div className="flex flex-col-reverse md:flex-row h-screen">
        <div
          className="w-screen md:w-[50%] h-[50%] md:h-screen
        bg-lime-500 flex justify-center items-center"
        >
          <img
            src={ login }
            alt="TrybeWallet"
            className="h-[90%]
          md:h-[55%] drop-shadow-lg"
          />
        </div>

        <div
          className="w-screen h-[50%] md:w-[50%] md:h-screen
        bg-gray-200 p-10 flex flex-col justify-center items-center"
        >
          <form
            onSubmit={ (e) => {
              e.preventDefault();
              dispatch(userData({ email, password }));
              history.push('/carteira');
            } }
            className="flex flex-col justify-evenly w-[80%] h-[75%] md:h-[35%]
            text-center rounded-2xl bg-lime-500 px-9 py-2 drop-shadow-md"
          >
            <h1 className="text-2xl font-semibold">TrybeWallet</h1>

            <label
              htmlFor="email"
              className="w-[100%]"
            >
              <input
                id="email"
                type="email"
                name="email"
                onChange={ this.handleChange }
                data-testid="email-input"
                placeholder="E-mail"
                required
                className="bg-gray-200 rounded-xl w-[100%] p-1 pl-3"
              />
            </label>

            <label
              htmlFor="password"
              className="w-[100%]"
            >
              <input
                id="password"
                type="password"
                name="password"
                onChange={ this.handleChange }
                data-testid="password-input"
                placeholder="Senha"
                required
                className="bg-gray-200 rounded-xl w-[100%] p-1 pl-3"
              />
            </label>

            <button
              type="submit"
              disabled={ !(emailRegex.test(email) && password.length > passwordLength) }
              className={ !(emailRegex.test(email) && password.length > passwordLength)
                ? `bg-gray-200 text-gray-400 rounded-xl p-1 w-[100%]
                border-lime-500 border-2`
                : `bg-blue-300 font-medium rounded-xl p-1 w-[100%]
                border-lime-500 border-2 hover:border-black hover:border-2` }
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);
