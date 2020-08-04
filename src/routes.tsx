import HomeIcon from '@material-ui/icons/Home'
import DeviceHubIcon from '@material-ui/icons/DeviceHub'
import SettingsIcon from '@material-ui/icons/Settings'
import InfoIcon from '@material-ui/icons/Info'

import Home from './Home'
import Devices from './Devices'
import Settings from './Settings'
import About from './About'
import NotFound from './NotFound'

interface Route {
  path: string,
  component: any,
  label?: string,
  exact?: boolean,
  divider?: boolean,
  icon?: any,
}

export default [
  {
    path: '/',
    label: 'Home',
    exact: true,
    icon: HomeIcon,
    component: Home,
  },
  {
    path: '/devices',
    label: 'Devices',
    exact: true,
    divider: true,
    icon: DeviceHubIcon,
    component: Devices,
  },
  {
    path: '/settings',
    label: 'Settings',
    exact: true,
    icon: SettingsIcon,
    component: Settings,
  },
  {
    path: '/about',
    label: 'About',
    exact: true,
    icon: InfoIcon,
    component: About,
  },
  {
    path: '/*',
    component: NotFound,
  },
] as Array<Route>
