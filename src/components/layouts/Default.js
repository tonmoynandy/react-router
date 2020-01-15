import React from 'react';
import { Route } from 'react-router-dom'; 
import Menu from '../Menu';
const DefaultLayoutTemplate = ({children})=>(
  <div className="container">
   

   <div className="row">
     <div className="col-md-2"> </div>
     <div className="col-md-8">
      <div className="card">
        <div className="card-body">
           <div className="default-logo-container">
           <div className="default-logo logo-img"></div>
          </div>
          {children}
          <div>
           <Menu/>
          </div>
        </div>
       </div>
       </div>
      </div>
  </div>


  
);

const DefaultLayout = ({component:Component, ...rest})=>{
  return (
    <Route {...rest} render={matchProps=>(

    <DefaultLayoutTemplate>
    <Component {...matchProps} />  
    </DefaultLayoutTemplate>
    )}/>
  );
}
export default DefaultLayout;

