/* global ga */
import '@babel/polyfill'
import React from 'react'
import { render } from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import {
  Router,
  Route,
  browserHistory,
  IndexRoute,
  applyRouterMiddleware
} from 'react-router'
import useScroll from 'react-router-scroll/lib/useScroll'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import oidc from 'oidc-client'

import AppContainer from './containers/App.jsx'
import oidcCallback from './containers/oidcCallback.jsx'
import HomeContainer from './containers/Home.jsx'
import InstitutionContainer from './containers/Institutions.jsx'
import SubmissionContainer from './containers/Submission.jsx'
import SubmissionRouter from './containers/SubmissionRouter.jsx'
import createUserManager from './utils/createUserManager.js'
import { setUserManager, setDispatch } from './utils/redirect.js'
import log from './utils/log.js'
import eventTracker from './middleware/gaEventTracker.js'

import appReducer from './reducers'

window.HMDA_ENV = {
  APP_URL: '##APP_URL##',
  HMDA_API: '##HMDA_API##',
  KEYCLOAK_URL: '##KEYCLOAK_URL##'
}

const loggerMiddleware = createLogger({ collapsed: true })
const middleware = [thunkMiddleware]

if (window.HMDA_ENV.APP_URL !== 'https://192.168.99.100') {
  middleware.push(eventTracker)
}

if (process.env.NODE_ENV !== 'production') {
  oidc.Log.logger = console
  middleware.push(loggerMiddleware)
}

const store = createStore(
  combineReducers({
    app: appReducer,
    routing: routerReducer
  }),
  applyMiddleware(...middleware)
)

setDispatch(store.dispatch)

const userManager = createUserManager(store.dispatch)
setUserManager(userManager)

/*Prevent token expiration loop*/
userManager.events.addSilentRenewError(e => {
  userManager.events._cancelTimers()
})

const history = syncHistoryWithStore(browserHistory, store)

history.listen(location => {
  log(JSON.parse(localStorage.getItem('hmdaHistory')))
  log(
    `The current URL is ${location.pathname}${location.search}${location.hash}`
  )
  localStorage.setItem('hmdaHistory', JSON.stringify(location))

  if (window.ga && ga.create) {
    ga('create', 'UA-56928643-1', 'auto')

    if (location.pathname !== '/oidc-callback') {
      ga('set', 'page', location.pathname)
      ga('send', 'pageview')
    }
  }
})

render(
  <Provider store={store}>
    <Router history={history} render={applyRouterMiddleware(useScroll())}>
      <Route path="/" component={AppContainer}>
        <IndexRoute component={HomeContainer} />
        <Route path="/oidc-callback" component={oidcCallback} />
        <Route path="/institutions" component={InstitutionContainer} />
        <Route path="/:institution/:filing" component={SubmissionRouter} />
        <Route path="/:institution/:filing/*" component={SubmissionRouter} />
        <Route path="/*" component={SubmissionRouter} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
)
