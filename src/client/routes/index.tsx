import { Home } from './Home';
import { Rules } from './Rules';

export const Routes = [
  {
    key: 'home',
    path: '/',
    Component: Home,
  },
  {
    key: 'rules',
    path: '/rules',
    Component: Rules,
  },
];
