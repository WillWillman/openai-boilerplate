import { connect } from 'react-redux';
import { actions } from 'Client-Store';
import { stringifyProps } from 'Client-Utils';

const HomeDumb = (props) =>
  <pre>
    {stringifyProps(props)}
  </pre>

export const Home = connect(
  (data) => ({
    data,
    actions: actions(),
  }),
)(HomeDumb);
