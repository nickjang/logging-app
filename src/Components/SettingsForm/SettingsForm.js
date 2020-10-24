import React, { Component } from 'react';
import AccountInput from '../AccountInput/AccountInput';
import './Settings.css';

class Settings extends Component {
  state = {
    email: {
      value: '',
      touched: false
    },
    password: {
      value: '',
      touched: false
    },
    loading: false,
    fetchError: {
      code: '',
      message: ''
    }
  }

  emailRef = React.createRef();

  updateEmail = (email) => {
    this.setState({ email: { value: email, touched: true } });
  }

  updatePassword = (password) => {
    this.setState({ password: { value: password, touched: true } });
  }

  validateEmail = () => {
    const email = this.state.email.value.trim();
    if (!email) return 'Email cannot be empty.';
    if (!email.includes('@')) return 'Email must include \'@\'.';
    if (!email.split('@')[1].includes('.')) return 'Email must include a \'.\'.';
    if (email.length < 5) return 'Please enter a valid email.';
    return;
  }

  validatePassword = () => {
    const password = this.state.password.value.trim();
    if (!password) return 'Password cannot be empty.';
    if (password.length < 8) return 'Password must be at least 8 characters.';
    if (!(/\d/.test(password))) return 'Password must contain at least one number.';
    return;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    //loading/error
    // api 
    this.context.updateAccount(this.state.email.value, this.state.password.value);
  }

  handleDeleteAccount = (e) => {
    e.preventDefault();
    //loading/error
    // api
    this.context.deleteAccount();
    // Link to welcome/overview
  }

  componentDidMount() {
    if (this.emailRef) this.emailRef.current.focus();
  }

  render() {
    return (
      <main>
        <h2>Settings</h2>
        <section>
          <h3>Account Settings</h3>
          <output form='account-settings-form'>{`Current Email: ${this.context.account.email}`}</output>
          <form id='account-settings-form'>
            <AccountInput 
              form='account-settings-form' 
              type='new-email' 
              ref={this.emailRef} 
              validate={this.validateEmail} 
              update={this.updateEmail} />
            <AccountInput 
              form='account-settings-form' 
              type='new-password' 
              validate={this.validatePassword} 
              update={this.updatePassword} />
            <button
              type='submit'
              form='account-settings-form'
              onClick={(e) => { this.handleSubmit(e) }}
              disabled={this.validateEmail() || this.validatePassword()}
            > Submit
            </button>
            <button
              type='reset'
              form='account-settings-form'
              onClick={(e) => { this.handleDeleteAccount(e) }}
            > Delete Account
            </button>
          </form>
        </section>
      </main>
    );
  }
}

export default Settings;