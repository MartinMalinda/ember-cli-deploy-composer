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
        return new RSVP.Promise(function(resolve, reject){
          _this.log('executing composer install');
          exec('composer install', function(error, stdout, stderr){
            if(error){
              _this.log('composer install errored');
              reject(error);
            }

            if(stderr){
              _this.log('composer install errored');
              reject(stderr);
            }

            _this.log('composer install was successful');
            resolve(stdout);
          });
        });
      },
    });

    return new DeployPlugin();
  }
};