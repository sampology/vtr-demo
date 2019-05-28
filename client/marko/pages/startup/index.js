const template = require('./index.marko');
const { environment } = require('client/config');
const { enc } = require('common/services/helpers');
const axios = require('axios')

module.exports = ctx => {
  const appData = {
    s: ctx.session,
    path: ctx.path,
    flashMessage: ctx.flash.get() || '',
  };
  const moduleData = {
    emailList: axios.get('https://jsonplaceholder.typicode.com/users').then(r => r.data || [])
  }
  ctx.type = 'text/html; charset=utf-8';
  return ctx.body = template.stream({
    moduleData,
    tplData: {
      environment,
      seo: {
        title: 'Start-up page',
        description: 'Start-up page',
      }
    },
    appData: enc(appData)
  });
};