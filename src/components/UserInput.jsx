import React from 'react';
import ReactPrismEditor from 'react-prism-editor';
import ResizePanel from 'react-resize-panel';

const UserInput = ({ jsonContent, setJsonContent }) => {
  return (
    <ResizePanel direction="s" handleClass="input-handler">
      <div className="box-input">
        <ReactPrismEditor
          language={'json'}
          theme={'okaidia'}
          code={jsonContent}
          lineNumber={true}
          readOnly={false}
          clipboard={false}
          changeCode={(jsonContent) => setJsonContent(jsonContent)}
        />
      </div>
    </ResizePanel>
  );
};

export default UserInput;
