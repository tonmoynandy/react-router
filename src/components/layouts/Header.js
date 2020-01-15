import React from 'react';
import { connect} from 'react-redux';
class Header extends React.Component {

    constructor(props) {
      super(props)
      if (sessionStorage.getItem('_u')) {
        let userData = JSON.parse(sessionStorage.getItem('_u'));
        this.props.dispatch({
          type: 'SET_AUTH_USER',
          userData
        })
      }
    }
    render() {
      return (
        <div className="header-content">
  <div className="row">
  <div className="col-1">
  <div className="default-logo-container">
           <div className="default-logo logo-img"></div>
          </div>
  </div>
  <div className="col-11 text-right">
 <label>Hi { (this.props.userData)?this.props.userData.name:''}</label>
  </div>
  </div>
  </div>
      );
    }
}
const mapStateToProps = (state)=>{
  return {
    userData: state.authreducer
  }
}
export default connect(mapStateToProps)(Header);