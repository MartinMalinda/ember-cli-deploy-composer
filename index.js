/* jshint node: true */
'use strict';

var BasePlugin = require('ember-cli-deploy-plugin');
var sys = require('sys')
var exec = require('child_process').exec;
var RSVP = require('rsvp');

module.exports = {
  name: 'ember-cli-deploy-composer',

  createDeployPlugin: function(options) {
    var DeployPlugin = BasePlugin.extend({
      name: options.name,

      willBuild: function(context) {
        var _this = this;

        var execute = RSVP.denodeify(exec);

        return exec('composer install');
      },
    });

    return new DeployPlugin();
  }
};