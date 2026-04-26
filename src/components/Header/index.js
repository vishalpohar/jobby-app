import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'

import {AiFillHome} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'

import './index.css'

const Header = props => {
  const onLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <div className="header-container">
      <div className="nav-container-lg">
        <Link to="/" className="link-item">
          <img
            className="website-logo-image"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </Link>
        <ul className="nav-links-list">
          <Link to="/" className="link-item">
            <li className="nav-item">Home</li>
          </Link>
          <Link to="/jobs" className="link-item">
            <li className="nav-item">Jobs</li>
          </Link>
        </ul>
        <button type="button" className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>
      <div className="nav-container-sm">
        <Link to="/" className="link-item">
          <img
            className="logo-image"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </Link>
        <ul className="nav-icons-list">
          <Link to="/" className="link-item">
            <li>
              <AiFillHome className="nav-icon" />
            </li>
          </Link>
          <Link to="/jobs" className="link-item">
            <li>
              <BsBriefcaseFill className="nav-icon" />
            </li>
          </Link>
          <li>
            <button className="btn" type="button" onClick={onLogout}>
              <FiLogOut className="nav-icon" />
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default withRouter(Header)
