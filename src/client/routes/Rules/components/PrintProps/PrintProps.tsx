const isFunction = action => typeof action === 'function';
const reducer = (acc, [actionType, actions]: [string, any[] | Record<string, any>]) => {
  acc[actionType] = Object.values(actions).every(isFunction)
    ? Object.keys(actions)
    : Object.entries(actions).reduce(reducer, {});
  return acc;
};

const StringifyProps = (props: any) =>
  JSON.stringify({
    ...props,
    actions: Object
      .entries(props.actions)
      .reduce(reducer, {}),
  }, null, 2);


export const PrintProps = (props: any) =>
  <pre>
    <StringifyProps {...props} />
  </pre>;
