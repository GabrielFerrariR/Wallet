import React, { Component } from 'react';
import connect from 'react-redux/lib/connect/connect';
import { login } from '../actions';
import PropTypes from 'prop-types';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isSubmitBtnDisabled: true,
    };
  }

  handleChange = ({ target: { name, value} }) => {
    this.setState({ [name]: value }, this.validation);
  }

  validation = () => {
    const { email, password } = this.state;
    const isValidEmail = /@(.*)\.com/.test(email);
    const validPasswordLgth = 6;
    const isValidPassword = password.length >= validPasswordLgth;
    this.setState({
      isSubmitBtnDisabled: !((isValidEmail && isValidPassword)),
    });
  }

  onLoginBtnClick = () => {
    const { email, password } = this.state;
    const { submit, history } = this.props;
    submit(email, password);
    history.push('/carteira');
  }

  render() {
    const { email, password, isSubmitBtnDisabled } = this.state;
    return (
      <div>
        <input
          type="text"
          data-testid="email-input"
          name="email"
          value={ email }
          onChange={ this.handleChange }
        />
        <input
          type="password"
          data-testid="password-input"
          name="password"
          value={ password }
          onChange={ this.handleChange }
        />
        <button
          type="button"
          disabled={ isSubmitBtnDisabled }
          onClick={ this.onLoginBtnClick }
        >
          Entrar
        </button>
      </div>);
  }
}

const mapDispatchToProps = (dispatch) => ({
  submit: (email, password) => dispatch(login(email, password)),
});

Login.propTypes = {
  submit: PropTypes.func,
  history: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
