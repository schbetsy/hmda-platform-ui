import React from 'react'
import PropTypes from 'prop-types'
import { signinRedirect, register } from '../utils/redirect.js'

const Home = props => {
  return (
    <div>
      <main className="Home" id="main-content">
        <section className="usa-hero">
          <div className="usa-grid">
            <div className="usa-width-one-whole">
              <h1>Get familiar with the HMDA Platform</h1>
              <p className="usa-font-lead">
                During this beta period, you may explore the new HMDA platform.
                It will be used to upload your financial institution's
                loan/application registers, review edits, certify the data, and
                submit the data for the filing year. All test data uploaded and
                accounts created during the beta period will be removed from the
                system when the filing period for HMDA data collected in 2017
                opens on January 1st, 2018.
              </p>
              <a
                href="#"
                className="usa-button"
                onClick={e => {
                  e.preventDefault()
                  signinRedirect('/institutions')
                }}
              >
                Log in
              </a>
              <span className="usa-text-small">or</span>
              <a
                href="#"
                className="register-link"
                onClick={e => {
                  e.preventDefault()
                  register('/institutions')
                }}
              >
                Create an account
              </a>
              <p className="usa-text-small">
                Every user is required to register online for login credentials
                and establish an account prior to accessing the HMDA Platform.
              </p>
            </div>
          </div>
        </section>
        <div className="usa-grid">
          <div className="usa-width-one-whole">
            <article className="faqs">
              <h2>Top FAQs</h2>
              <dl>
                <dt>What is the deadline for submitting my HMDA data?</dt>
                <dd>
                  The deadline for submitting HMDA data is March 1 following the
                  calendar year for which data are collected and recorded. For
                  example, for data collected in 2017, the deadline for
                  submitting HMDA data is March 1, 2018.
                </dd>
                <dt>
                  Can my financial institution have multiple user accounts?
                </dt>
                <dd>
                  Each financial institution may have multiple user accounts.
                  Also, an individual may establish an account on behalf of more
                  than one financial institution, provided that the user has
                  been authorized by each such financial institution to do so.
                </dd>
                <dt>
                  Will I be able to manually enter my LAR into the HMDA
                  Platform?
                </dt>
                <dd>
                  The HMDA Platform only accepts a pipe-delimited text file
                  containing your LAR. If changes are required to your LAR,
                  please enter them into your pipe-delimited text file before
                  uploading the file to the HMDA Platform. This must be a single
                  file as the HMDA Platform will not allow users to combine
                  multiple files.
                </dd>
                <dt>
                  Is there another tool for me to confirm that my LAR is in the
                  correct format?
                </dt>
                <dd>
                  Filers who wish to confirm that their LAR is formatted in the
                  required pipe-delimited text file format may also use the HMDA
                  File Format Verification Tool available at{' '}
                  <a href="https://cfpb.github.io/hmda-platform-tools/file-format-verification/">
                    https://cfpb.github.io/hmda-platform-tools/file-format-verification/
                  </a>. This tool will conduct some of the same initial checks
                  that the HMDA Platform performs, and provides a convenient
                  test mechanism for filers.
                </dd>
              </dl>
            </article>
          </div>
        </div>

        <div className="usa-grid">
          <hr />
          <div className="usa-width-one-whole">
            <h3>CFPB Notice and Consent Banner</h3>
            <p className="usa-text-small">
              This is a Consumer Financial Protection Bureau (CFPB) information
              system. The CFPB is an independent agency of the United States
              Government. CFPB information systems are provided for the
              processing of official information only. Unauthorized or improper
              use of this system may result in administrative action, as well as
              civil and criminal penalties. Because this is a CFPB information
              system, you have no reasonable expectation of privacy regarding
              any communication or data transiting or stored on this information
              system. All data contained on CFPB information systems is owned by
              CFPB and your use of the CFPB information system serves as your
              consent to your usage being monitored, intercepted, recorded,
              read, copied, captured or otherwise audited in any manner, by
              authorized personnel, including but not limited to employees,
              contractors, and/or agents of the United States Government.
            </p>
          </div>
        </div>

        <div className="usa-grid">
          <hr />
          <div className="usa-width-one-whole">
            <h3>Paperwork Reduction Act</h3>
            <p className="usa-text-small">
              According to the Paperwork Reduction Act of 1995, an agency may
              not conduct or sponsor, and, not withstanding any other provision
              of law, a person is not required to respond to a collection of
              information unless it displays a valid OMB control number. The OMB
              control number for this collection is 3170-0008. The time required
              to complete this information collection is estimated to average
              between 7,700 hours and 77 hours per response depending on the
              size of the institution, per response. The obligation to respond
              to this collection of information is mandatory per the Home
              Mortgage Disclosure Act 12 U.S.C. 2801-2810 as implemented by
              CFPB’s Regulation C 12 CFR part 1003. Comments regarding this
              collection of information, including the estimated response time,
              suggestions for improving the usefulness of the information, or
              suggestions for reducing the burden to respond to this collection
              should be submitted to the Bureau at the Consumer Financial
              Protection Bureau (Attention: PRA Office), 1700 G Street NW,
              Washington, DC 20552, or by email to PRA@cfpb.gov. The other
              agencies collecting information under this regulation maintain OMB
              Control numbers for their collections as follows: Office of the
              Comptroller of the Currency (1557–0159), the Federal Deposit
              Insurance Corporation (3064–0046), the Federal Reserve System
              (7100–0247), the Department of Housing and Urban Development (HUD)
              (2502–0529), the National Credit Union Administration (3133–0166).
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home
