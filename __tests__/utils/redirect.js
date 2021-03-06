jest.mock('react-router')
jest.unmock('../../src/js/utils/redirect')
console.log = jest.fn()

import {
  register,
  signinRedirect,
  restorePage,
  logout,
  setUserManager,
  getUserManager
} from '../../src/js/utils/redirect.js'

describe('redirect', () => {
  it('gets userManager', () => {
    expect(getUserManager()).toBe(null)
  })

  it('sets userManager', () => {
    setUserManager(2)
    expect(getUserManager()).toBe(2)
  })

  it('fails signin with no userManager', () => {
    setUserManager(null)
    delete console.error
    console.error = jest.fn()
    signinRedirect()
    expect(console.error.mock.calls.length).toBe(1)
  })

  it('fails register with no userManager', () => {
    setUserManager(null)
    delete console.error
    console.error = jest.fn()
    register()
    expect(console.error.mock.calls.length).toBe(1)
  })

  it('overrides the auth endpoint when registering', done => {
    const um = jest.fn()
    const ls = jest.fn()

    delete window.location
    setUserManager({
      signinRedirect: um,
      settings: { metadataService: { getAuthorizationEndpoint: 'bargle' } }
    })
    window.localStorage = { setItem: ls }
    window.location = { pathname: '/' }

    register()

    expect(
      getUserManager().settings.metadataService.getAuthorizationEndpoint
    ).not.toBe('bargle')
    expect(um.mock.calls.length).toBe(1)
    expect(ls.mock.calls.length).toBe(1)

    window.HMDA_ENV = { KEYCLOAK_URL: 'argle' }
    getUserManager()
      .settings.metadataService.getAuthorizationEndpoint()
      .then(url => {
        expect(url).toBe('argle/protocol/openid-connect/registrations')
        done()
      })
  })

  it('calls redir', () => {
    const um = jest.fn()
    const ls = jest.fn()

    delete window.location

    setUserManager({ signinRedirect: um })
    window.localStorage = { setItem: ls }
    window.location = { pathname: '/' }

    expect(signinRedirect()).toBe(undefined)

    expect(um.mock.calls.length).toBe(1)
    expect(ls.mock.calls.length).toBe(1)

    window.location = { pathname: '/oidc-callback' }
    expect(signinRedirect()).toBe(undefined)

    window.location = { pathname: '/fake' }
    expect(signinRedirect()).toBe(undefined)

    expect(um.mock.calls.length).toBe(3)
    expect(ls.mock.calls.length).toBe(3)
  })

  it('restores the page', () => {
    const getItem = jest.fn()
    const removeItem = jest.fn()

    window.localStorage = { getItem: getItem, removeItem: removeItem }

    restorePage()

    expect(getItem.mock.calls.length).toBe(1)
    expect(removeItem.mock.calls.length).toBe(1)
  })

  it('logs the user out', () => {
    const um = jest.fn()

    setUserManager(null)
    logout()
    expect(um.mock.calls.length).toBe(0)

    setUserManager({ signoutRedirect: um })
    logout()
    expect(um.mock.calls.length).toBe(1)
  })
})
