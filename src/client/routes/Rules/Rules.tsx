import { connect } from 'react-redux';
import { getActions } from 'Client-Store';
import { Props } from './interfaces';
import { defaultPrompt } from './utils';

const RulesDumb = (props: Props) => {
  return <>
  </>
};

export const Rules = connect(
  data => ({ data }),
  getActions,
)(RulesDumb);
