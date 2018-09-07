import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {UnControlled as CodeMirror} from 'react-codemirror2';

export default class YamlCodeMirrorWrap extends PureComponent {
    static propTypes = {
        onChange: PropTypes.func.isRequired,
        value: PropTypes.string
    };

    editorRefCallback = ref => {
        if (!ref) {
            return;
        }
        const codeMirrorRef = ref;
        const codeMirrorWrapperDomElement = codeMirrorRef.editor.display.wrapper;
        const offsetTop = codeMirrorWrapperDomElement.getBoundingClientRect().top;
        const clientHeight = window.innerHeight || document.clientHeight || document.getElementByTagName('body').clientHeight;
        const height = clientHeight - offsetTop;
        codeMirrorRef.editor.setSize(null, height);
    };

    onChangeCallback = (editor, data, value) => {
        const cursorCoordinates = editor.getCursor();
        let newValue;

        // we replace inserted tabs with two spaces, because we need to work around CM behaviour
        if (editor._isCleaningUpTabs !== true) {
            editor._isCleaningUpTabs = true;
            newValue = value.replace(/^( *)\t/m, '$1  ');
            if (value !== newValue) {
                editor.setValue(newValue);
                // set character one ahead, since we replaced one tab by two spaces
                editor.setCursor({'line': cursorCoordinates.line, 'ch': cursorCoordinates.ch + 1});
            }
            editor._isCleaningUpTabs = false;
        }
        this.props.onChange(value);
    };

    render() {
        const options = {
            mode: 'text/x-yaml',
            theme: 'twilight',
            indentWithTabs: false,
            tabSize: 2,
            indentUnit: 2,
            styleActiveLine: true,
            lineNumbers: true,
            lineWrapping: true,
            autoClearEmptyLines: true,
            _isCleaningUpTabs: false
        };

        return (
            <CodeMirror value={this.props.value} options={options} ref={this.editorRefCallback}
                onChange={this.onChangeCallback} />
        );
    }
}
