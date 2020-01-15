import React from 'react';
import UserMenu from './UserMenu';
import { DbHelper } from '../DbHelper';
import { connect } from 'react-redux';
import Form from './elements/Form';
import FlashMessage from './elements/FlashMessage';
class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: '',
            success: '',
            user: JSON.parse(sessionStorage.getItem("_u")),
            profileFormConfig: {
                name: 'profileform',
                elements: {
                    'name': {
                        type: 'text',
                        value: '',
                        validation: ['required']
                    }
                },
                buttons: [
                    {
                        type: 'submit',
                        value: 'Save',
                        cssClass: 'btn btn-success'
                    }
                ]
            },
            changePasswordFormConfig: {
                name: 'changepasswordform',
                elements: {
                    'old_password': {
                        type: 'password',
                        validation: ['required']
                    },
                    'new_password': {
                        type: 'password',
                        validation: ['required']
                    },
                    'confirm_password': {
                        type: 'password',
                        validation: ['required', 'match_to:new_password']
                    },
                },
                buttons: [
                    {
                        type: 'submit',
                        value: 'Change',
                        cssClass: 'btn btn-success'
                    }
                ]
            },
        }
    }
    componentDidMount() {
        document.profileform.name.value = this.state.user.name;
    }
    updateProfileAction = (e) => {
        if (e.valid === true) {
            let userData = this.state.user;
            userData = {
                ...userData,
                name: e.formValue.name
            };
            DbHelper.update('users', [["_id", userData._id]], userData);
            this.props.dispatch({
                type: 'SET_AUTH_USER',
                userData
            });
            this.props.dispatch({
                type:'SUCCESS',
                message:'Profile is updated successfully'
            })
        } else {
            this.props.dispatch({
                type:'ERROR',
                message:'Something wrong'
            })
        }
    }
    changePasswordAction = (e) => {
        if (e.valid === true) {
            if (e.formValue.old_password !== this.state.user.password) {
                e.form.reset();
                this.props.dispatch({
                    type:'ERROR',
                    message:'Old password is not matching'
                });
            } else {
                let userData = this.state.user;
                userData = {
                    ...userData,
                    password: e.formValue.new_password
                };
                DbHelper.update('users', [["_id", userData._id]], userData);
                this.props.dispatch({
                    type: 'SET_AUTH_USER',
                    userData
                });
                this.props.dispatch({
                    type:'SUCCESS',
                    message:'Password is updated successfully'
                });
                e.form.reset();
            }
        }
    }
    render() {
        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-5">
                        <h4>Settings</h4>
                    </div>
                    <div className="col-7 text-right">
                        <UserMenu />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <FlashMessage />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="card">
                            <div className="card-body">
                                <h6 className="card-title">Profile Update</h6>
                                <div className="card-text">
                                    <Form config={this.state.profileFormConfig} onSubmit={this.updateProfileAction} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card">
                            <div className="card-body">
                                <h6 className="card-title">Change Password</h6>
                                <div className="card-text">
                                    <Form config={this.state.changePasswordFormConfig} onSubmit={this.changePasswordAction} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
export default connect()(Settings);