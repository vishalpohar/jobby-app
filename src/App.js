import {Switch, Route, Redirect} from 'react-router-dom'

import Login from './components/Login'
import Home from './components/Home'
import Jobs from './components/Jobs'
import JobDetails from './components/JobDetails'
import NotFound from './components/NotFound'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <Route exact path="/" component={Home} />
    <Route exact path="/jobs" component={Jobs} />
    <Route exact path="/jobs/:id" component={JobDetails} />
    <Route exact path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
