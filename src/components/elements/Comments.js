import React from 'react';
import {DbHelper} from '../../DbHelper';
import Moment from 'react-moment';
class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.comment = React.createRef();
    this.state = {
      commentsList:[],
      user:JSON.parse(sessionStorage.getItem("_u")),
    }
  }

componentDidMount() {
  
  this.getCommentList();
}
postComment = ()=> {
  if (this.comment.current.value) {
    DbHelper.insert('comments',{
        post_id:this.props.post._id,
        user_id:this.state.user._id,
        comment:this.comment.current.value,
        postedAt: new Date().getTime()
    });
    this.comment.current.value = '';
    this.getCommentList();
    this.props.sendResponse(this.props.post._id)
  }
  
}
getCommentList() {
  let postComments = DbHelper.filter('comments',[
    ['post_id',this.props.post._id]
  ]).map((i)=>{
    let user = DbHelper.find('users',[['_id',i.user_id]]);
    return (
      <div key={i.posteddAt}>
      {i.comment} - <strong>{user.name}</strong> <i><Moment fromNow>{ i.posteddAt }</Moment></i>
      </div>
    );
  });
  this.setState({commentsList:postComments});
}
render(){
  
  return (
    <div className="comment-container">
    <div className="card">
    <div className="card-body">
    <div>
    {this.state.commentsList}
    </div>
    <div>
    <div className="input-group">
    <input type="text" className="form-control" placeholder="Type comment..." ref={this.comment}/>  
    <div className="input-group-append">
        <button className="input-group-text" onClick={this.postComment}>Send</button>
      </div>  
    </div>    
    </div>
    </div>
    </div>
   
    </div>
  );

}
}

export default Comments;