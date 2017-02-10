/**
 * Editor for YAML, based on CodeMirror.
 */
define(
  [
    'emberjs',
    'Content/Inspector/SecondaryInspectorController',
    'Library/codemirror',
    'Shared/I18n',
    './Mode/Yaml'
  ],
  function (Ember, SecondaryInspectorController, CodeMirror, I18n) {
    return SecondaryInspectorController.SecondaryInspectorButton.extend({
      label: function () {
        return I18n.translate(this.get('buttonLabel'));
      }.property(),

      viewClass: function () {
        var that = this;

        return Ember.View.extend({
          classNames: ['neos-secondary-inspector-code-editor'],
          template: Ember.Handlebars.compile('<textarea></textarea>'),

          didInsertElement: function () {
            var $editorContent = this.$().find('textarea'),
              value = that.get('value'),
              editor = CodeMirror.fromTextArea($editorContent.get(0), {
                mode: 'text/x-yaml',
                theme: 'solarized dark',
                indentWithTabs: false,
                tabSize: 2,
                indentUnit: 2,
                styleActiveLine: true,
                lineNumbers: true,
                lineWrapping: true,
                autoClearEmptyLines: true,
                _isCleaningUpTabs: false
              });

            editor.on('change', function () {
              var cursorCoordinates = editor.getCursor(),
                value = editor.getValue(),
                newValue;

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
              that.set('value', value);
            });

            editor.setValue(value);
          }
        });
      }.property()
    });
  });