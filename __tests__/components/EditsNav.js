jest.unmock('../../src/js/components/EditsNav.jsx')
jest.mock('../../src/js/components/UserHeading.jsx', () => jest.fn(() => null))
jest.mock('../../src/js/components/RefileWarning.jsx', () =>
  jest.fn(() => null)
)
jest.mock('../../src/js/containers/submissionProgressHOC.jsx', () =>
  jest.fn(comp => comp)
)

import EditsNav from '../../src/js/components/EditsNav.jsx'
import Wrapper from '../Wrapper.js'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-dom/test-utils'

const baseProps = {
  page: 'upload',
  base: 'a/b',
  code: 1,
  syntacticalValidityEditsExist: true,
  qualityVerified: false,
  macroVerified: false,
  fetched: true
}

const getLinkCount = rendered => {
  return TestUtils.scryRenderedDOMComponentsWithClass(rendered, 'usa-nav-link')
    .length
}

describe('EditsNav', () => {
  it('renders with base props', () => {
    const rendered = TestUtils.renderIntoDocument(
      <Wrapper>
        <EditsNav {...baseProps} period="2017" institution={{ name: 'Test' }} />
      </Wrapper>
    )
    const renderedNode = ReactDOM.findDOMNode(rendered)
    expect(renderedNode).toBeDefined()
    expect(getLinkCount(rendered)).toBe(1)
  })

  it('renders after upload', () => {
    const props = { ...baseProps, code: 8 }
    const rendered = TestUtils.renderIntoDocument(
      <Wrapper>
        <EditsNav {...props} period="2017" institution={{ name: 'Test' }} />
      </Wrapper>
    )
    expect(getLinkCount(rendered)).toBe(2)
  })

  it('renders with no synval', () => {
    const props = {
      ...baseProps,
      syntacticalValidityEditsExist: false,
      code: 8
    }
    const rendered = TestUtils.renderIntoDocument(
      <Wrapper>
        <EditsNav {...props} period="2017" institution={{ name: 'Test' }} />
      </Wrapper>
    )
    expect(getLinkCount(rendered)).toBe(3)
  })

  it('renders when quality verified', () => {
    const props = {
      ...baseProps,
      syntacticalValidityEditsExist: false,
      qualityVerified: true,
      code: 8
    }
    const rendered = TestUtils.renderIntoDocument(
      <Wrapper>
        <EditsNav {...props} period="2017" institution={{ name: 'Test' }} />
      </Wrapper>
    )
    expect(getLinkCount(rendered)).toBe(4)
  })

  it('renders when macro verified', () => {
    const props = {
      ...baseProps,
      syntacticalValidityEditsExist: false,
      qualityVerified: true,
      macroVerified: true,
      code: 8
    }
    const rendered = TestUtils.renderIntoDocument(
      <Wrapper>
        <EditsNav {...props} period="2017" institution={{ name: 'Test' }} />
      </Wrapper>
    )
    expect(getLinkCount(rendered)).toBe(4)
  })

  it('renders all links if code > 8', () => {
    const props = {
      ...baseProps,
      code: 9
    }
    const rendered = TestUtils.renderIntoDocument(
      <Wrapper>
        <EditsNav {...props} period="2017" institution={{ name: 'Test' }} />
      </Wrapper>
    )
    expect(getLinkCount(rendered)).toBe(5)
  })

  it('warns without provided props', () => {
    console.error = jest.fn()
    const rendered = TestUtils.renderIntoDocument(<EditsNav />)
    expect(console.error).toHaveBeenCalledTimes(7)
  })
})

describe('componentDidMount', () => {
  it('adds the event listener, but bails without rendered header/nav', () => {
    const listen = jest.fn()
    const setState = jest.fn()
    delete window.addEventListener
    window.addEventListener = listen

    const nav = new EditsNav(baseProps)
    nav.setState = setState
    nav.componentDidMount()
    expect(listen).toBeCalled()
    expect(setState).not.toBeCalled()
  })

  it('sets state when header/userHeadering/editsNav exist', () => {
    const setState = jest.fn()
    const byId = jest.fn(() => {
      return { clientHeight: 2 }
    })
    delete document.getElementById
    document.getElementById = byId

    const nav = new EditsNav(baseProps)
    nav.setState = setState
    nav.componentDidMount()
    expect(byId.mock.calls.length).toBe(3)
    expect(setState).toBeCalledWith({ headerHeight: 4, editsNavHeight: 2 })
  })
})

describe('componentDidUpdate', () => {
  it('sets state when current height is not equal to saved height', () => {
    const setState = jest.fn()
    const byId = jest.fn(() => {
      return { clientHeight: 2 }
    })
    delete document.getElementById
    document.getElementById = byId

    const nav = new EditsNav(baseProps)
    nav.setState = setState
    nav.state.editsNavHeight = 4
    nav.componentDidUpdate()
    expect(setState).toBeCalledWith({ editsNavHeight: 2 })
  })

  it('does not set state when current height is equal to saved height', () => {
    const setState = jest.fn()
    const byId = jest.fn(() => {
      return { clientHeight: 2 }
    })
    delete document.getElementById
    document.getElementById = byId

    const nav = new EditsNav(baseProps)
    nav.setState = setState
    nav.state.editsNavHeight = 2
    nav.componentDidUpdate()
    expect(setState).not.toBeCalled()
  })
})

describe('componentWillUnmount', () => {
  it('removes event listener on unmount', () => {
    delete window.removeEventListener
    const remove = jest.fn()
    window.removeEventListener = remove
    const nav = new EditsNav(baseProps)
    nav.componentWillUnmount()

    expect(remove).toBeCalled()
  })
})

describe('handleScroll', () => {
  it('sets state to fixed when scrollY >= headerHeight and state not fixed', () => {
    const setState = jest.fn()
    const nav = new EditsNav(baseProps)
    nav.setState = setState
    window.scrollY = 123
    nav.state.headerHeight = 2
    nav.state.fixed = false
    nav.handleScroll()
    expect(setState).toBeCalledWith({ fixed: true })
  })

  it('does not set state to fixed when scrollY >= headerHeight and state fixed', () => {
    const setState = jest.fn()
    const nav = new EditsNav(baseProps)
    nav.setState = setState
    window.scrollY = 123
    nav.state.headerHeight = 2
    nav.state.fixed = true
    nav.handleScroll()
    expect(setState).not.toBeCalled()
  })

  it('sets state to unfixed when scrollY < headerHeight and state fixed', () => {
    const setState = jest.fn()
    const nav = new EditsNav(baseProps)
    nav.setState = setState
    window.scrollY = 123
    nav.state.headerHeight = 234
    nav.state.fixed = true
    nav.handleScroll()
    expect(setState).toBeCalledWith({ fixed: false })
  })

  it('does not set state when scrollY < headerHeight and state unfixed', () => {
    const setState = jest.fn()
    const nav = new EditsNav(baseProps)
    nav.setState = setState
    window.scrollY = 123
    nav.state.headerHeight = 234
    nav.state.fixed = false
    nav.handleScroll()
    expect(setState).not.toBeCalled()
  })
})

describe('render', () => {
  it('sets class if fixed when rendering', () => {
    const nav = new EditsNav(baseProps)
    nav.state.fixed = true
    const rendered = nav.render()
    expect(rendered.props.children.props.className).toEqual(
      'EditsNav EditsNav-fixed'
    )
  })
})
