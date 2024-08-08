import React, { useState, useEffect, useRef } from "react";
import { Highlight, themes } from "prism-react-renderer";
import Header from "./Header";

import './CodeEditor.css';

const App = () => {
  const [code, setCode] = useState(`//start coding...`);
  const textareaRef = useRef(null);
  const preRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current && preRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      preRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [code]);

  const handleChange = (e) => {
    setCode(e.target.value);
  };

  return (
    <div>
      <Header />
      <div className="code-editor-container">
        <Highlight theme={themes.shadesOfPurple} code={code} language="jsx">
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              ref={preRef}
              className={`code-highlight ${className}`}
              style={style}
            >
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
        <textarea
          ref={textareaRef}
          value={code}
          onChange={handleChange}
          className="code-textarea"
        />
      </div>
    </div>
  );
};

export default App;