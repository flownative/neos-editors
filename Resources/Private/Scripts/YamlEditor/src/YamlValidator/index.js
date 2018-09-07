import React from 'react';
import I18n from '@neos-project/neos-ui-i18n';
import yaml from '../../../../../Public/Scripts/Inspector/Validators/js-yaml.min'

/**
 * Checks if the given value is valid YAML
 */
const YamlValidator = value => {
    if (typeof(value) !== 'string') {
        this.addError(I18n.translate('content.inspector.validators.stringValidator.stringIsExpected'));
    }

    try {
        yaml.safeLoad(value, 'utf8');
        return null;
    } catch (e) {
        console.log(e);
        return 'Invalid YAML, ' + e.message;
    }
};

export default YamlValidator;
