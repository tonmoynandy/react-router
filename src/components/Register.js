import React from 'react';
import { Link } from 'react-router-dom';
import { DbHelper } from '../DbHelper';
import Form from './elements/Form';
class Register extends React.Component {

  constructor() {
    super();
    this.state = {
      formConfig: {
        name: 'regForm',
        elements: {
          'name': {
            type: 'text',
            value: '',
            validation: ['required']
          },
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
            value: 'Sign up',
            cssClass: 'btn btn-success'
          }
        ]
      },

      successMessage: ''
    }
  }
  componentDidMount() {

  }

  submitHandeler = (e) => {
    if (e.valid) {
      DbHelper.insert('users', e.formValue);
      document[this.state.formConfig.name].reset();
      this.setState({ 'successMessage': 'Welcome ' + e.formValue.name })
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col-2"></div>
        <div className="col-8">
          <div className="card">
            <div className="card-body">
              <h5 className="text-center">Sign up</h5>
              {this.state.successMessage &&
                <div className="alert alert-success" >
                  {this.state.successMessage}
                </div>
              }
              <Form config={this.state.formConfig} onSubmit={this.submitHandeler} />
              <div className="row">
                <div className="col text-right">
                  <Link to={'/'} >Existing User?</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-2"></div>
      </div>
    );
  }
}

export default Register;