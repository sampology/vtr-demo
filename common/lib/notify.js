const { isObject } = require('common/services/helpers');

module.exports = (type, title, message) => {
  PNotify.closeAll();
  const nObj = {
    title,
    textTrusted: true,
    modules: {
      Buttons: {
        closer: true,
        sticker: false
      }
    }
  };
  switch (true) {
    case Array.isArray(message):
      nObj.text = message.join('<br/>');
      break;
    case isObject(message):
      const text = [];
      if (Object.keys(message).length > 0) {
        Object.keys(message).forEach(k => text.push(message[k]))
      }
      nObj.text = text.join('<br/>');
      break;
    default:
      if (message) nObj.text = message
  }
  return PNotify[type](nObj);
};