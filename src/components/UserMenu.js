import React from 'react';
import { Link , Redirect } from 'react-router-dom';
class UserMenu extends React.Component {
  constructor() {
    super();
    this.state = {
      user:JSON.parse(sessionStorage.getItem("_u")),
    }
  }
logoutHandeler = ()=>{
  sessionStorage.removeItem('_u');
  return <Redirect to="/"/>
}
render(){
  return (
    <div>
    <Link to={'/dashboard'}>Home</Link> |&nbsp;
    <Link to={`/profile/${this.state.user._id}`}>My Profile</Link> |&nbsp;
    <Link to={'/friendzone'}>Friend Zone</Link> |&nbsp;
    <Link to={'/settings'}>Settings</Link> |&nbsp;
    <Link onClick={this.logoutHandeler}>Logout</Link>
    </div>
  );

}
}

export default UserMenu;