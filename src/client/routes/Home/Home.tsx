import { connect } from 'react-redux';
import { useEffect } from 'react';
import { getActions } from 'Client-Store';
import { initData, stringifyProps } from './utils';
import { Props } from './interfaces';

const HomeDumb = (props: Props) => {
  useEffect(initData(props), []);

  return <pre>
    {stringifyProps(props.data)}
  </pre>
}

export const Home = connect(
  data => ({ data }),
  getActions,
)(HomeDumb);