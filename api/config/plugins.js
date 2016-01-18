var Path = require('path');
var Fs = require('fs');

// Get models
var models = [];
Fs.readdirSync(Path.resolve(__dirname, '../models')).forEach(function(file) {
  var model = require('../models/' + file);
  models.push(model);
});

module.exports = [{
  register: require('inert')
}, {
  register: require('vision')
}, {

  register: require('dogwater'),
  options: {
    models: models,

    connections: {
      disk: {
        adapter: 'disk'
      }
    },

    adapters: {
      disk: require('sails-disk'),
    }
  }

}, {

  register: require('good'),
  options: {
    opsInterval: 5000,
    reporters: [{
      reporter: require('good-console'),
      events: { log: '*', request: '*', response: '*', error: '*' }
    }]
  }
}, {

  register: require('hapi-swagger')
}];

