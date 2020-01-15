import React from 'react';
import {Route,Redirect } from 'react-router-dom';
import Header from './Header';
const AfterLoginLayoutTemplate = ({children})=>(
  <div className="container">
  <Header/>
  <div className="row">
      <div className="col">
      <div className="card">
      <div className="card-body">

  {children}
  </div>
      </div>
      </div></div>
  </div>
);

const AfterLoginLayout = ({component:Component, ...rest})=>{
return (
 <Route {...rest} render={matchProps=>(
   (sessionStorage.getItem('_u'))?
   <AfterLoginLayoutTemplate>
   <Component {...matchProps} />  
   </AfterLoginLayoutTemplate>:
   <Redirect to="/"/>
 )}  />
);
}

export default ( AfterLoginLayout);