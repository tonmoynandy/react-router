import React from 'react';
import {Switch } from 'react-router-dom';
import routeCollection from './router/route.const';

import DefaultLayout from './layouts/Default';
import AfterLoginLayout from './layouts/AfterLogin';

const RouteLayer = ()=>{
  let routeDisplayCollection = routeCollection.map((route,i)=>{
    switch(route.layout) {
      case 'DefaultLayout':
      return <DefaultLayout key={i} exact path={route.path} component={route.component}/>
      case 'AfterLoginLayout':
      return <AfterLoginLayout key={i} path={route.path} component={route.component}/>
      default: return null;
    }
  });
  return (
    <Switch>
      {routeDisplayCollection}
    </Switch>
  )
}
export default RouteLayer;