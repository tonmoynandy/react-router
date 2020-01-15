import React from 'react';
import { Link  } from 'react-router-dom';
class Menu extends React.Component {

render(){
  return (
    <div>
    {sessionStorage.getItem('_u') &&
    <Link to={'/dashboard'}>Home</Link>
    }
     {!sessionStorage.getItem('_u') &&
    <Link to={'/'}>Home</Link>
    }
    
    <Link to={'/about'}>About</Link>
    <Link to={'/contact'}>Contact</Link>

    
    </div>
  );

}
}

export default Menu;