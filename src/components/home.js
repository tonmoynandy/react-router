import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {DbHelper} from '../DbHelper';
import {connect} from 'react-redux';
import Form from './elements/Form';
class Home extends  Component {
  constructor() {
    super();
    this.state = {
      
      formConfig: {
        name: 'loginForm',
        elements: {
         
          'email': {
            type: 'email',
            value: '',
            validation: ['required', 'email']
          },
          'password': {
            type: 'password',
            value: '',
            validation: ['required']
          }
        },
        buttons: [
          {
            type: 'submit',
            value: 'Login',
            cssClass: 'btn btn-success'
          }
        ],
        submitHandeler: null
      },

      errors:''
    }
  }
  submitHandeler = (e) => {
    if (e.valid) {
      let userData = DbHelper.find('users',[
        ['email', e.formValue.email],
        ['password', e.formValue.password],
      ]);

      if (userData) {
        
        this.props.dispatch({
          type: 'SET_AUTH_USER',
          userData
        });
        this.props.history.push('/dashboard');
      } else {
this.setState({'errors':'Login failed: credentials mismatch'});
      }
    }
  }
  render() {
return (

<div className="row">
<div className="col-md-2"> </div>
<div className="col-md-8">
  <div className="card">
  <div className="card-body">
  {this.state.errors &&
          <div className="alert alert-danger" >
          {this.state.errors}
          </div>
          }
  <Form config={this.state.formConfig} onSubmit={this.submitHandeler} />
<div className="row">
         
          <div className="col text-right">
        <Link to={'/register'}>New User?</Link>
          </div>
          </div>
  
</div>
</div>
</div>
<div className="col-md-2"> </div>
</div>
);
  }
}
export default connect()(Home);