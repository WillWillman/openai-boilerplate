import { connect } from 'react-redux';
import { actions } from 'Client-Store';
import { stringifyProps } from 'Client-Utils';

const ${{ variables.input_Component }}Dumb = (props) =>
    <div>
        <h1>hello from ${{ variables.input_Component }}</h1>

        <pre>
            {stringifyProps(props)}
        </pre>
    </div>;

export const ${{ variables.input_Component }} = connect(
    (data) => ({
        data,
        actions: actions(),
    }),
)(${{ variables.input_Component }}Dumb);
