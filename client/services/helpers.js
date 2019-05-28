const moment = require('moment');
const countries = require('common/lib/countries.json');
const helpers = {
  humanDate: (date) => moment(date).format('DD/MM/YYYY'),
  humanStatus: (status) => status === true ? 'Active' : (status === false ? 'Inactive' : 'N/A'),
  humanCountry: (countryCode) => {
    const country = countries.find(x => x.value === countryCode);
    return country.name
  }
};
module.exports = helpers;