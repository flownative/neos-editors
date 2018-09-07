import manifest from '@neos-project/neos-ui-extensibility';

import YamlEditor from './YamlEditor/index';
import YamlCodeMirrorWrap from "./Secondary/YamlCodeMirrorWrap";
import YamlValidator from './YamlValidator/index';

manifest('Flownative.Neos.Editors:YamlEditor', {}, globalRegistry => {
    const editorsRegistry = globalRegistry.get('inspector').get('editors');
    const secondaryEditorsRegistry = globalRegistry.get('inspector').get('secondaryEditors');
    const validatorRegistry = globalRegistry.get('validators');

    editorsRegistry.set('Flownative.Neos.Editors/Inspector/Editors/Yaml', {
        component: YamlEditor
    });
    secondaryEditorsRegistry.set('Flownative.Neos.Editors/Editors/Secondary/YamlCodeMirrorWrap', {
        component: YamlCodeMirrorWrap
    });
    validatorRegistry.set('Flownative.Neos.Editors/Inspector/Validators/Yaml', YamlValidator);
});
