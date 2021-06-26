import React from 'react';
import ReactPrismEditor from 'react-prism-editor';
import ResizePanel from 'react-resize-panel';

const UserInput = ({ jsonContent, setJsonContent }) => {
  //   const [jsonContent, setJsonContent] = useState(
  //     `{type: "start", timestamp: 1519862400000, select: ["min_response_time","max_response_time"], group: ["os","browser"]},
  // {type: "span", timestamp: 1519862400000, begin: 1519862400000, end: 1519862460000},
  // {type: "data", timestamp: 1519862400000, os: "linux", browser: "chrome", min_response_time: 0.1, max_response_time: 1.3},
  // {type: "data", timestamp: 1519862400000, os: "mac", browser: "chrome", min_response_time: 0.2, max_response_time: 1.2},
  // {type: "data", timestamp: 1519862400000, os: "mac", browser: "firefox", min_response_time: 0.3, max_response_time: 1.2},
  // {type: "data", timestamp: 1519862400000, os: "linux", browser: "firefox", min_response_time: 0.1, max_response_time: 1.0},
  // {type: "data", timestamp: 1519862460000, os: "linux", browser: "chrome", min_response_time: 0.2, max_response_time: 0.9},
  // {type: "data", timestamp: 1519862460000, os: "mac", browser: "chrome", min_response_time: 0.1, max_response_time: 1.1},
  // {type: "stop", timestamp: 1519862460000}`
  //   );

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
