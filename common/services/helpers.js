const SJCL = require('common/lib/sjcl');
const helpers = {
  lastElementFromArray: (array) => {
    if (Array.isArray(array) && array.length > 0) {
      return array[array.length - 1];
    }
    return null;
  },
  keyInArray: (key, array) => array.indexOf(key) > -1,
  arrayUnique: array => array.reduce((prev, cur) => {
    if (prev.indexOf(cur) === -1) {
      return prev.concat([cur]);
    }
    return prev;
  }, []),
  capitalizeFirstLetter: string => String(string).charAt(0).toUpperCase() +
    String(string).slice(1).toLowerCase(),
  MAC: 'require("./a/m")',
  ASSETS_URL: '',
  enc: input => SJCL.encrypt(helpers.MAC, JSON.stringify(input)),
  dec: input => JSON.parse(SJCL.decrypt(helpers.MAC, (typeof input === 'object') ? JSON.stringify(input) : input)),
  nl2br: (str, isXhtml) => {
    if (typeof str === 'undefined' || str === null) {
      return '';
    }
    const breakTag = (isXhtml || typeof isXhtml === 'undefined') ? '<br />' : '<br>';
    return (str)
      .replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, `$1${breakTag}$2`);
  },
  fnVal: val => Number((val.toFixed(3).toFixed(2))),
  camelize: (str) => {
    return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
      if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
      return index === 0 ? match.toLowerCase() : match.toUpperCase();
    });
  },
  goBack: () => window.history.go(-1),
  isObject: (o) => {
    return o instanceof Object && o.constructor === Object
  },
  flattenObject: (ob) => {
    let toReturn = {};
    let flatObject;
    for (let i in ob) {
      if (!ob.hasOwnProperty(i)) {
        continue;
      }
      //Exclude arrays from the final result
      //Check this http://stackoverflow.com/questions/4775722/check-if-object-is-array
      if(ob[i] && Array === ob[i].constructor){
        // continue;
        toReturn[i] = ob[i]
      } else {
        if ((typeof ob[i]) === 'object') {
          // if (i === 'permissions') {
          //   console.log(ob[i]);
          // }
          flatObject = helpers.flattenObject(ob[i]);
          for (let x in flatObject) {
            if (!flatObject.hasOwnProperty(x)) {
              continue;
            }
            //Exclude arrays from the final result
            if (flatObject[x] && Array === flatObject.constructor) {
              toReturn[i + (!!isNaN(x) ? '.' + x : '')] = ob[i][x];
              // continue;
            } else {
              toReturn[i + (!!isNaN(x) ? '.' + x : '')] = flatObject[x];
            }
          }
        } else {
          toReturn[i] = ob[i];
        }
      }
    }
    return toReturn
  },
  generateCode: (min = 100000, max = 999999) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
  },
  isAdmin: (user) => {
    return user && user.acl.role === 'Admin'
  },
  isEditor: (user) => {
    return user && user.acl.role === 'Editor'
  },
  isUser: (user) => {
    return user && user.acl.role === 'User'
  },
  isAllowedVessels: (user) => {
    return user && (user.acl.permissions.indexOf('vessel') > -1 || user.acl.role === 'Admin' || user.acl.role === 'Editor')
  },
  isAllowedVoyages: (user) => {
    return user && (user.acl.permissions.indexOf('contract') > -1 || user.acl.role === 'Admin' || user.acl.role === 'Editor')
  }
};

module.exports = helpers;
