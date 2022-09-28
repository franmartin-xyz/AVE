
import React from "react";
import "./richreader.css"
import 'draft-js/dist/Draft.css';
import {Editor, EditorState, convertFromRaw, }  from "draft-js"

class RichEditorExample extends React.Component {
    constructor(props) {
      super(props);
      this.state = {}
      this.state.editorState =  EditorState.createWithContent(convertFromRaw(JSON.parse(props.newState)));
    }

    render() {
      const {editorState} = this.state;
      let className = 'RichViewer-editor';

      return (
        <div className="RichViewer-root">
          <div className={className} >
            <Editor
                readOnly={true}
              editorState={editorState}
              spellCheck={true}
            />
          </div>
        </div>
      );
    }
  }
  export default RichEditorExample