import { connect } from 'react-redux';
import { useEffect } from 'react';
import { getActions } from 'Client-Store';
import { Props } from './interfaces';
import { initData } from './utils';
import { PrintProps } from './components';

const HomeDumb = (props: Props) => {
  useEffect(initData(props), []);

  return <>
    <PrintProps {...props} />
  </>;
};

export const Home = connect(
  data => ({ data }),
  getActions,
)(HomeDumb);
