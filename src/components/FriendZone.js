import React from 'react';
import UserMenu from './UserMenu';
import {DbHelper} from '../DbHelper';
import {Link} from 'react-router-dom'
import FlashMessage from './elements/FlashMessage';
class FriendZone extends React.Component {

    constructor() {
      super();
      this.state = {
        errors:'',
        success:'',
        searchUsers:[],
        inviteFriends:[],
        friends:[],
        user:JSON.parse(sessionStorage.getItem("_u")),
      }
      
    }
    componentDidMount() {
      this.getFriendList();
      this.inviteFriends();
    }

    checkFriend(friendId) {
      let checkRequest = DbHelper.find('friend_requests',[
        ['user_id', this.state.user._id],
        ['friend_id',friendId]
      ]);
      return checkRequest;
    }
    sendRequest = (friend)=>{
      let checkRequest =this.checkFriend(friend._id);
      if (!checkRequest) {
        DbHelper.insert('friend_requests',{
        user_id:this.state.user._id,
        friend_id:friend._id,
        status:'P'
      });
      this.props.dispatch({
        type:'SUCCESS',
        message:'Request is  sent'
      })
      } else {
        this.props.dispatch({
          type:'ERROR',
          message:'Request is already sent'
        })
      }
      
    }
    searchFriends = (event)=>{
      let users = JSON.parse(localStorage.getItem('users'));
      let keyword = event.target.value;
      let resultData = [];
      let searchUsersContent = [];
      if (keyword) {
        resultData = users.filter((i)=>{
          return i._id!==this.state.user._id && i.name.indexOf(keyword) > -1;
        });
        
        resultData.forEach((i)=>{
          searchUsersContent.push(
            <div className="card">
            <div className="card-body d-flex">
            <div className="col">{i.name}</div>
            <div className="col text-right"><button className="btn btn-primary btn-sm" disabled={this.checkFriend(i._id)}  onClick={()=>{this.sendRequest(i)}}>Send</button></div>
            </div>
            </div>
          )
        })
        
      } else {
        searchUsersContent = [];
      }
      this.setState({searchUsers:searchUsersContent});
    }

    statusChangeRequest(friend,status) {
      DbHelper.update('friend_requests',[['_id',friend._id]],{'status':status});
      if (status==='A') {
        DbHelper.insert('friend_requests',{
        friend_id:friend.user_id,
        user_id:this.state.user._id,
        status:'A'
      });
      }
      this.setState({success:'Request is  '+((status==='A')?'accepted':'rejected')});
        setTimeout(()=>{
          this.setState({success:null});
        },3000);
      this.inviteFriends();
      this.getFriendList();
    }
    inviteFriends = ()=>{
      let requestsList = JSON.parse(localStorage.getItem('friend_requests'));
      if (!requestsList) {
        requestsList = [];
      }
      let resultData = [];
      let requestFriendContent = [];
        resultData = requestsList.filter((i)=>{
          return i.friend_id === this.state.user._id && i.status==='P';
        });
        requestFriendContent = resultData.map((i)=>{
          let user = DbHelper.find('users',[['_id',i.user_id]]);
            return (<div className="card">
            <div className="card-body  text-center">
            <div ><Link to={'/profile/'+user._id}>{user.name}</Link> </div>
            <div ><button className="btn btn-primary btn-sm"   onClick={()=>{this.statusChangeRequest(i,'A')}}>Accept</button> <button className="btn btn-danger btn-sm"   onClick={()=>{this.statusChangeRequest(i,'R')}}>Reject</button></div>
            </div>
            </div>)
        })
       this.setState({'inviteFriends':requestFriendContent});
    }

    getFriendList() {
      let requestsList = JSON.parse(localStorage.getItem('friend_requests'));
      if (!requestsList) {
        requestsList = [];
      }
      let resultData = [];
      let friendContent = [];
        resultData = requestsList.filter((i)=>{
          return i.user_id === this.state.user._id && i.status==='A';
        });
        friendContent = resultData.map((i)=>{
          let user = DbHelper.find('users',[['_id',i.friend_id]]);
            return (
              <div className="card">
            <div className="card-body">
            <div className="col">
             <Link to={'/profile/'+user._id}>{user.name}</Link> 
            </div>
            
            </div>
            </div>)
        })
       this.setState({'friends':friendContent});
    }
    render (){
      return (
        <React.Fragment>
      <div className="row">
      <div className="col-5">
      <h4>Friend Zone</h4>
      </div>
      <div className="col-7 text-right">
      <UserMenu/>
      </div>
      </div>
      <div className="card">
        <div className="card-body">
        <h5 className="card-title">Search Friend</h5>
        <FlashMessage/>
        <div className="form-group">
        <input type="text" placeholder="Search Friends..." className="form-control" onKeyUp={this.searchFriends} />
        </div>
        <div>
        {this.state.searchUsers}
        </div>
  
        </div>
      </div>
      <div className="card">
        <div className="card-body">
        <h5 className="card-title">Invitation</h5>
        <div className="d-flex">
        {this.state.inviteFriends}
        </div>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
        <h5 className="card-title">Friends</h5>
        <div className="d-flex">
        {this.state.friends}</div>
        </div>
      </div>
      </React.Fragment>
      );
    }
}
export default FriendZone;