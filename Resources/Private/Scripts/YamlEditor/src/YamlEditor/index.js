import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {$get} from 'plow-js';

import {Button,Icon,Label} from '@neos-project/react-ui-components';
import {I18n} from '@neos-project/neos-ui-i18n';
import {neos} from '@neos-project/neos-ui-decorators';

import style from './style.css';

import YamlMode from 'codemirror/mode/yaml/yaml';

@neos(globalRegistry => ({
    secondaryEditorsRegistry: globalRegistry.get('inspector').get('secondaryEditors')
}))
export default class CodeMirror extends PureComponent {
    static propTypes = {
        className: PropTypes.string,
        identifier: PropTypes.string.isRequired,
        renderSecondaryInspector: PropTypes.func.isRequired,
        commit: PropTypes.func.isRequired,
        label: PropTypes.string.isRequired,
        value: PropTypes.string,
        secondaryEditorsRegistry: PropTypes.object.isRequired,
        options: PropTypes.object
    };

    render() {
        const {label, identifier, className} = this.props;
        const disabled = $get('options.disabled', this.props);
        const handleClick = () => disabled ? null : this.handleOpenCodeEditor;

        return (
            <div>
                <Label className={style.codemirror__label} htmlFor={identifier}>
                    <Button className={className} style="lighter" disabled={disabled} onClick={handleClick()}>
                        <Icon icon="pencil" padded="right" title="Edit"/>
                        {label}
                    </Button>
                </Label>
            </div>
        );
    }

    handleChange = newValue => {
        this.props.commit(newValue);
    };

    handleOpenCodeEditor = () => {
        const {secondaryEditorsRegistry} = this.props;
        const {component: YamlCodeMirrorWrap} = secondaryEditorsRegistry.get('Flownative.Neos.Editors/Editors/Secondary/YamlCodeMirrorWrap');

        this.props.renderSecondaryInspector('CODEMIRROR_EDIT', () =>
            <YamlCodeMirrorWrap onChange={this.handleChange} value={this.props.value} highlightingMode='text/x-yaml'/>
        );
    }
}
