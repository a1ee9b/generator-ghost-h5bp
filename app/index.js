'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var async = require('async');


var GhostH5bpGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {

        // TODO
        var msg = {
          commands: [],
          template: '\n\nNow execute `gulp` and then select `'+this.templateName+'` as your new template.'
        };

        var commands = [],

          options = {
            bower: true,
            npm: true,
            skipInstall: false,
            skipMessage: false,
            callback: function () {}
          };

      if (options.bower) {
          msg.commands.push('cd '+this.templateName+'; bower install');
          commands.push(function (cb) {
            this.bowerInstall(null, null, cb);
          }.bind(this));
        }

        if (options.npm) {
          msg.commands.push('cd '+this.templateName+'; npm install');
          commands.push(function (cb) {
            this.npmInstall(null, null, cb);
          }.bind(this));
        }

        if (!options.skipInstall) {
          async.parallel(commands, options.callback);
        }

      }
    });
  },

  askFor: function () {
    var done = this.async();

    // have Yeoman greet the user
    this.log(this.yeoman);

    // replace it with a short and sweet description of your generator
    this.log(chalk.magenta('You will bootstrap a new Ghost theme with Html5Boilerplate and Gulp.'));

    var prompts = [{
      name: 'templateName',
      message: 'What would you like to call the template?'
    }, {
      name: 'userName',
      message: 'What is your name?'
    }, {
      name: 'userEmail',
      message: 'What is your email?'
    }];

    this.prompt(prompts, function (props) {
      this.templateName = props.templateName;
      this.userName = props.userName;
      this.userEmail = props.userEmail;

      done();
    }.bind(this));
  },

  app: function () {
    var baseDir = this.templateName;
    this.mkdir( baseDir );

    this.template('_package.json', baseDir+'/package.json');
    this.template('_bower.json', baseDir+'/bower.json');
    this.copy('apple-touch-icon-precomposed.png', baseDir+'/apple-touch-icon-precomposed.png');
    this.copy('crossdomain.xml', baseDir+'/crossdomain.xml');
    this.copy('default.hbs', baseDir+'/default.hbs');
    this.copy('favicon.ico', baseDir+'/favicon.ico');
    this.copy('gulpfile.js', baseDir+'/gulpfile.js');
    this.copy('humans.txt', baseDir+'/humans.txt');
    this.copy('index.hbs', baseDir+'/index.hbs');
    this.copy('page.hbs', baseDir+'/page.hbs');
    this.copy('post.hbs', baseDir+'/post.hbs');
    this.copy('robots.txt', baseDir+'/robots.txt');

    this.copy('dev/scripts/livereload.js', baseDir+'/dev/scripts/livereload.js');
    this.copy('dev/scripts/main.js', baseDir+'/dev/scripts/main.js');

    this.copy('dev/styles/boilerplate.css', baseDir+'/dev/styles/boilerplate.css');
    this.copy('dev/styles/main.css', baseDir+'/dev/styles/main.css');
  },

  projectfiles: function () {
    var baseDir = this.templateName;

    this.copy('editorconfig', baseDir+'/.editorconfig');
    this.copy('jshintrc', baseDir+'/.jshintrc');
  }
});

module.exports = GhostH5bpGenerator;