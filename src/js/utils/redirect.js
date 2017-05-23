import { browserHistory } from 'react-router'

let userManager = null

const setUserManager = manager => {
  userManager = manager
}

const getUserManager = () => {
  return userManager
}

const signinRedirect = (force) => {
  if(!userManager) return console.error('userManager needs to be set on app initialization')
  if(location.pathname === '/oidc-callback') return false
  if(!force && location.pathname === '/') return false
  console.log('signinRedirect triggered, saving page:', location.pathname)
  localStorage.setItem('hmdaPageBeforeSignin', location.pathname)
  userManager.signinRedirect()
  return true
}


const restorePage = () => {
  const restored = localStorage.getItem('hmdaPageBeforeSignin')
  localStorage.removeItem('hmdaPageBeforeSignin')
  console.log('restoring page to', restored)
  browserHistory.replace(restored)
}

const logout = () => {
 if(!userManager) return console.error('userManager needs to be set on app initialization')
 browserHistory.push('/')
 userManager.signoutRedirect()
}

export {
  signinRedirect,
  restorePage,
  logout,
  setUserManager,
  getUserManager
}