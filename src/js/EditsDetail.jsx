var React = require('react');
var EditsDetailRow = require('./EditsDetailRow.jsx');

var EditsDetail = React.createClass({
  propTypes: {
    details: React.PropTypes.array,
    setAppStatus: React.PropTypes.func
  },

  headerMap: {
    edit: 'Edit ID',
    lar: 'Loan ID',
    type: 'Edit Type',
    verification: 'Verification',
    verified: 'Verified'
  },

  render: function() {
    var self = this;
    if(!this.props.details || !this.props.details[0]) return null;

    var headers = Object.keys(this.props.details[0]);
    if(!headers) return null;
    if(headers.indexOf('verification') !== -1) headers.push('verified');

    return (
      <div className="EditsDetail expandable_content">
        <table width="100%">
          <thead>
            <tr>
              {headers.map(function(header, i){
                return <th key={i}>{self.headerMap[header]}</th>
              })}
            </tr>
          </thead>
          <tbody>
            {this.props.details.map(function(detail, i){
              return <EditsDetailRow id={i} key={i} detail={detail} setAppStatus={self.props.setAppStatus}/>
            })}
          </tbody>
        </table>
      </div>
    )
  }
});

module.exports = EditsDetail;
