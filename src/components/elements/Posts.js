import React from 'react';
import { Link } from 'react-router-dom';
import {DbHelper} from '../../DbHelper';
import Comments from './Comments';
import Moment from 'react-moment';
class Posts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            commentDisplay:[]
        }
    }
    commentDisplay = (postIndex) => {
        let commentdisplayArr = this.state.commentDisplay;
        let index = commentdisplayArr.indexOf(postIndex);
        if (index === -1) {
            commentdisplayArr.push(postIndex);
        } else {
            commentdisplayArr.splice(index, 1);
        }

        this.setState({ commentDisplay: commentdisplayArr })
    }
    handelCommentResponse = (response) => {
        let userPosts = this.props.posts;
        let postIndex = userPosts.findIndex((i) => {
            return i._id === response;
        })
        this.props.posts[postIndex].comments = userPosts[postIndex].comments + 1;
        // this.props.dispatch({
        //     type: 'USER_POST',
        //     userPosts
        // })
    }
    render() {
        var userPostContent = [];
        for (let x = 0; x < this.props.posts.length; x++) {
            let post = this.props.posts[x]
            let postedAt = new Date(post.postedAt);
            this.props.posts[x].comments = post.comments = DbHelper.filter('comments',[['post_id',post._id]]).length;
            let postUser = DbHelper.find('users',[['_id',post.user]]);
            userPostContent.push(
                <React.Fragment key={postedAt}>
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <p>{post.content}</p>
                                <p><small>by <strong>
                                    <Link to={`/profile/${postUser._id}`}>{postUser.name}</Link></strong> <Moment fromNow>{postedAt}</Moment></small></p>
                                <div>
                                    <span role="img">💬</span> <a href="javascript:void(0)" onClick={() => { this.commentDisplay(x) }}>{post.comments} comments</a>
                                    {this.state.commentDisplay && this.state.commentDisplay.indexOf(x) > -1 &&
                                        <Comments key={postedAt} post={post} sendResponse={this.handelCommentResponse} />
                                    }
                                </div>
                            </div>
                        </div>
                    </div></React.Fragment>
            )

        }
        return userPostContent;
    }
}

export default Posts;