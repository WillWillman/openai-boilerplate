import { Routes as DomRoutes, Route } from 'react-router-dom';
import { Routes } from './Routes';

export const App = (props) => {
  const routes = Routes
    .map(({ Component, ...rest }) => ({ element: <Component {...props} />, ...rest}))
    .map((({ key, ...rest }) => <Route key={key} {...rest} />));

  return <DomRoutes>{routes}</DomRoutes>;
};
