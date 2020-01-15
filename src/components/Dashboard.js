import React, {Component} from 'react';
import {DbHelper} from '../DbHelper';
import {connect} from 'react-redux';
import UserMenu from './UserMenu';
import Posts from './elements/Posts';
import FlashMessage from './elements/FlashMessage';
class Dashboard extends  Component {
  constructor(props) {
    super(props);
    this.state = {
      errors:'',
      success:'',
      user:JSON.parse(sessionStorage.getItem("_u")),
      commentDisplay:[]
    }
    this.getUserPosts();
  }
  getUserPosts() {
    let userFriendList = DbHelper.filter('friend_requests',[
      ['user_id',this.state.user._id],
      ['status','A']    
    ]);
    let friendIds = userFriendList.map((i)=> i.friend_id);
    friendIds.push(this.state.user._id);
        let userPosts = DbHelper.all('posts');
        userPosts = userPosts.filter((i)=> friendIds.indexOf(i.user)>-1);
    userPosts = userPosts.sort(function(a,b){ return b.postedAt - a.postedAt });
    if (userPosts) {
      this.props.dispatch({
          type: 'USER_POST',
          userPosts
        })
      // USER_POST
    }
  }
  submitPost = ()=>{
    const form = document.postform;
    let postContent = form.postcontent.value;
    postContent = postContent.trim();
    if (postContent) {
      DbHelper.insert('posts',{
          user: this.state.user._id,
          content:postContent,
          postedAt: new Date().getTime()
      });
      this.props.dispatch({
        type:'SUCCESS',
        message:'Your status is posted'
      })
      form.reset();
      this.getUserPosts();
      setTimeout(()=>{
        this.setState({'success':null});
      },3000)
    } else {
      this.props.dispatch({
        type:'ERROR',
        message:'Please add any content as your status'
      })
      setTimeout(()=>{
        this.setState({'errors':null});
      },3000)
    }
   
  }

  render() {
    
    return (
      <React.Fragment>
      <div className="row">
      <div className="col-5">
      <h4>Dashboard</h4>
      </div>
      <div className="col-7 text-right">
      <UserMenu/>
      </div>
      </div>
      <div className="row">
      <div className="col-12">
          <FlashMessage />
          <div className="card"><div className="card-body">
          <form name="postform">
          <div className="form-group">
          <textarea placeholder="Your status..." name="postcontent" className="form-control"></textarea></div>
          </form>
          <div className="col text-right">
          <input type="button" onClick={this.submitPost} value="Post" className="btn btn-primary btn-sm"/>
          </div>
          </div></div>
      </div>
      </div>
      <div className="row">
      {this.props.userPosts &&
      <Posts posts={this.props.userPosts}/>
      }
      </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) =>{
  return {
    userPosts: state.userpostreducer
  }
}

export default connect(mapStateToProps)(Dashboard);