/**
 * Validator for YAML.
 */
define(
  [
    'Shared/Validation/AbstractValidator',
    'Shared/I18n',
    './js-yaml.min'
  ],
  function (AbstractValidator, I18n, yaml) {
    return AbstractValidator.extend({
      /**
       * Checks if the given value is a valid YAML string.
       *
       * @param {mixed} value The value that should be validated
       * @return {void}
       */
      isValid: function (value) {
        if (typeof(value) !== 'string') {
          this.addError(I18n.translate('content.inspector.validators.stringValidator.stringIsExpected'));
        }

        try {
          yaml.safeLoad(value, 'utf8');
        } catch (e) {
          this.addError('Invalid YAML, ' + e.message);
          console.log(e);
        }
      }
    });
  }
);
