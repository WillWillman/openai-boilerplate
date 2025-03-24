import { connect } from 'react-redux';
import { getActions } from 'Client-Store';
import { Props } from './interfaces';
import { defaultPrompt } from './utils';
import { useState } from 'react';

const ErrorMessage = ({ message }) => (
  <div style={{ color: 'red' }}>{message}</div>
);

const EditorTextarea = ({ value, onChange, hasError }) => (
  <textarea
    value={value}
    onChange={onChange}
    style={{
      width: '100%',
      height: '500px',
      fontFamily: 'monospace',
      border: hasError ? '2px solid red' : '1px solid #ccc',
    }}
  />
);

const FormatButton = ({ onClick }) => (
  <button onClick={onClick} style={{ marginBottom: '10px' }}>
    Format JSON
  </button>
);

const EditorContainer = ({ children }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
    {children}
  </div>
);

const JsonEditor = ({ initialValue, onChange }) => {
  const [value, setValue] = useState(JSON.stringify(initialValue, null, 2));
  const [error, setError] = useState('');

  const handleChange = e => {
    const newValue = e.target.value;
    setValue(newValue);

    try {
      const parsed = JSON.parse(newValue);
      setError('');
      onChange(parsed);
    } catch (err) {
      setError(err.message);
    }
  };

  const formatJson = () => {
    try {
      const parsed = JSON.parse(value);
      setValue(JSON.stringify(parsed, null, 2));
      setError('');
      onChange(parsed);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <EditorContainer>
      <FormatButton onClick={formatJson} />
      <EditorTextarea
        value={value}
        onChange={handleChange}
        hasError={!!error}
      />
      {error && <ErrorMessage message={error} />}
    </EditorContainer>
  );
};

const SendToApiButton = ({ onClick, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    style={{
      marginTop: '10px',
      padding: '8px 16px',
      backgroundColor: disabled ? '#ccc' : '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '4px'
    }}
  >
    Send to Chat Completion API
  </button>
);

const PageHeader = () => (
  <h1>Rules JSON Editor</h1>
);

const RulesDumb = (props: Props) => {
  const [jsonValue, setJsonValue] = useState(defaultPrompt);
  const [hasError, setHasError] = useState(false);

  const handleJsonChange = (value) => {
    setJsonValue(value);
    setHasError(false);
  };

  const handleSendToApi = () => {
    if (!hasError && props.actions?.openai?.chatCompletion) {
      props.actions.openai.chatCompletion(jsonValue);
    }
  };

  return (
    <div>
      <PageHeader />
      <JsonEditor initialValue={jsonValue} onChange={handleJsonChange} />
      <SendToApiButton
        onClick={handleSendToApi}
        disabled={hasError}
      />
    </div>
  );
};

export const Rules = connect(
  data => ({ data }),
  getActions,
)(RulesDumb);
