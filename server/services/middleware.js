const { enc, dec } = require('common/services/helpers');
const { validateData } = require('common/lib/validator');

const mw = {
  checkRequestBody: () => async (ctx, next) => {
    const { data } = ctx.request.body;
    let isJSON = true;
    let _data = null;
    try {
      _data = JSON.parse(data);
    } catch (e) {
      isJSON = false;
    }
    if (isJSON) {
      if (_data && _data.ks === 128 && _data.adata === '') {
        ctx.request.body = dec(_data);
        return next()
      }
      return ctx.body = {
        success: false,
        message: enc('403. Forbidden :/')
      }
    }
    return ctx.body = {
      success: false,
      message: enc('403. Forbidden :/')
    }
  },
  validateData: () => async (ctx, next) => {
    const {inputData, dataConstraints} = ctx.state;
    if (!inputData) {
      return ctx.body = {
        success: false,
        message: enc('Invalid input data.')
      }
    }
    if (!dataConstraints) {
      return ctx.body = {
        success: false,
        message: enc('Invalid data rules.')
      }
    }
    const validation = validateData(inputData, dataConstraints);
    if (validation === undefined) {
      return next()
    }
    if (validation) {
      if (validation.__validationMessage) {
        return ctx.body = {
          success: false,
          message: enc(validation.__validationMessage)
        }
      }
      return ctx.body = {
        success: false,
        message: enc(validation)
      }
    }
  },
  returnAPIData: () => async (ctx) => {
    ctx.status = 200;
    ctx.type = 'application/json; charset=utf-8';
    const {returnData, errorMessage, errorData} = ctx.state;
    if (errorMessage) {
      const response = {};
      response.success = false;
      response.message = enc(errorMessage);
      if (errorData) {
        response.data = enc(errorData)
      }
      return ctx.body = response;
    }
    return ctx.body = {
      success: true,
      data: returnData ? enc(returnData) : {}
    }
  },
};

module.exports = mw;