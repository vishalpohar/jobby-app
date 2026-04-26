import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {usernameInput: '', passwordInput: '', errorMsg: '', showError: false}

  onChangeUsernameInput = event => {
    this.setState({usernameInput: event.target.value})
  }

  onChangePasswordInput = event => {
    this.setState({passwordInput: event.target.value})
  }

  onFormSubmit = async event => {
    event.preventDefault()
    const {usernameInput, passwordInput} = this.state

    const userDetails = {
      username: usernameInput,
      password: passwordInput,
    }

    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      this.setState({showError: false, errorMsg: ''})
      const jwtToken = data.jwt_token
      Cookies.set('jwt_token', jwtToken, {expires: 7})
      const {history} = this.props
      history.replace('/')
    } else {
      this.setState({showError: true, errorMsg: data.error_msg})
    }
  }

  render() {
    const {usernameInput, passwordInput, errorMsg, showError} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken) {
      return <Redirect to="/" />
    }
    return (
      <div className="container">
        <div className="nav-container">
          <form className="form-container" onSubmit={this.onFormSubmit}>
            <img
              className="logo-image"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
            />
            <div className="input-container">
              <label className="label-element" htmlFor="username">
                USERNAME
              </label>
              <input
                type="text"
                id="username"
                value={usernameInput}
                onChange={this.onChangeUsernameInput}
                placeholder="Username"
                className="input-element"
              />
            </div>
            <div className="input-container">
              <label className="label-element" htmlFor="password">
                PASSWORD
              </label>
              <input
                type="password"
                id="password"
                value={passwordInput}
                onChange={this.onChangePasswordInput}
                placeholder="Password"
                className="input-element"
              />
            </div>
            <button type="submit" className="login-btn">
              Login
            </button>
            <p className="error-msg">{showError && `*${errorMsg}`}</p>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
