import { Routes, Route } from 'react-router-dom';
import { Home } from 'Client-Routes';

export const App = (props) =>
  <Routes>
    <Route path="/" element={<Home {...props} />} />
  </Routes>;
