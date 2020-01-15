import Home from '../home';
import Register from '../Register';
import Dashboard from '../Dashboard';
import FriendZone from '../FriendZone';
import PublicProfile from '../PublicProfile';
import Settings from '../Settings';
import About from '../About';
import Contact from '../Contact';
const routeCollection = [
  {
    path: '/',
    component: Home,
    layout: 'DefaultLayout' 
  },
  {
    path: '/register',
    component: Register,
    layout: 'DefaultLayout' 
  },
  {
    path: '/about',
    component: About,
    layout: 'DefaultLayout' 
  },
  {
    path: '/contact',
    component: Contact,
    layout: 'DefaultLayout' 
  },
  {
    path: '/dashboard',
    component: Dashboard,
    layout: 'AfterLoginLayout' 
  },
  {
    path: '/friendzone',
    component: FriendZone,
    layout: 'AfterLoginLayout' 
  },
  {
    path: '/profile/:id',
    component: PublicProfile,
    layout: 'AfterLoginLayout' 
  },
  {
    path: '/settings',
    component: Settings,
    layout: 'AfterLoginLayout' 
  },
  
];
export default routeCollection;