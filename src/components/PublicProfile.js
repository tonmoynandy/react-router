import React from 'react';
import UserMenu from './UserMenu';
import { DbHelper } from '../DbHelper';
import { Link } from 'react-router-dom';
import Posts from './elements/Posts';
class PublicProfile extends React.Component {

    constructor() {
        super();
        this.state = {
            errors: '',
            success: '',
            user: {}
        }
    }

    render() {
        const { id } = this.props.match.params;
        let user = DbHelper.find('users', [['_id', parseInt(id)]]);
        user['friends'] = DbHelper.filter('friend_requests', [['user_id', parseInt(id)], ['status', 'A']]).map((i) => {
            return {
                ...i,
                friend: DbHelper.find('users', [['_id', parseInt(i.friend_id)]]),

            }
        });
        user['posts'] = DbHelper.filter('posts', [['user', parseInt(id)]]);
        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-5">
                        <h4>{user.name}</h4>
                    </div>
                    <div className="col-7 text-right">
                        <UserMenu />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        {this.state.success &&
                            <div class="alert alert-success text-center">
                                {this.state.success}
                            </div>
                        }
                        {this.state.errors &&
                            <div class="alert alert-danger text-center">
                                {this.state.errors}
                            </div>
                        }
                        {user.friends &&
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Friends</h5>
                                    <div className="row">
                                        {user.friends.map((i) => {
                                            return (
                                                <div className="card">
                                                    <div className="card-body">
                                                        <Link to={'/profile/' + i.friend._id}> {i.friend.name}</Link>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        }
                        <br/>
                        <div className="row">
                            {user.posts &&
                                <Posts posts={user.posts} />
                            }
                        </div>

                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default PublicProfile;