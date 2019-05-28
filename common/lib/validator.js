const validate = require('./validate');

validate.validators.presence.options = { message: 'is required.' };

const Validator = {
  validate: validate,
  messages: {
    lengthMessage: 'not accepted.',
    emailMessage: 'not valid.',
    passwordMessage: 'doesn\'t match.'
  },
  constraints: fields => {
    const output = {};
    fields.forEach(field => {
      const { name, rules } = field;
      output[name] = rules;
    });
    return output;
  },
  validateData: (inputData, dataConstraints) => {
    if (!inputData || !dataConstraints) return { __validationMessage: 'Invalid data. There is no data nor constraints.' };
    const output = {};
    const inputDataKeys = Object.keys(inputData);
    for (const k of inputDataKeys) { // check if input data (as keys) exist in rules fields (as name)
      if (!dataConstraints[k]) return { __validationMessage: 'Invalid data. The field ' + k + ' does not belong here. Maybe you need to add it to form validation rules?' };
      const fieldIsNotValid = validate.single(inputData[k], dataConstraints[k]);
      /**
       * returns undefined if all inputs are valid
       * or
       * returns Object like { field: [errorMessage] } if input invalid.
       */
      const _k = k.split('.');
      const __k = _k[_k.length - 1];
      if (fieldIsNotValid) {
        output[k] = validate.prettify(__k) + ' ' + fieldIsNotValid;
      }
    }
    if (Object.keys(output).length === 0) return undefined;
    return output;
  }
};
module.exports = Validator;