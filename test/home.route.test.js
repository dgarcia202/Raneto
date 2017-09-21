'use strict';

describe.only('#home.route', function () {

  var path = require('path');
  var moment = require('moment');
  var expect = require('chai').expect;
  var request = require('supertest');
  var express = require('express');
  var hogan = require('hogan-express');
  var proxyquire = require('proxyquire');
  var sinon = require('sinon');

  var config_builder = require('./config.test');

  var coreStub = require('../app/core/lib/raneto');
  var fsStub = require('fs');
  var getFilePathStub = sinon.stub();
  var getLastModifiedStub = sinon.stub();
  var removeImageDirStub = sinon.stub();
  var home_route = proxyquire('../app/routes/home.route', {
    'fs': fsStub,
    '../functions/get_filepath.js':  getFilePathStub,
    '../functions/get_last_modified.js': getLastModifiedStub,
    '../functions/remove_image_content_directory.js': removeImageDirStub
  });

  function buildApp() {
    var app = express();
    var config = config_builder({
      authentication: false,
      authentication_for_edit: false
    });
    app.set('views', path.join(config.theme_dir, config.theme_name, 'templates'));
    app.set('view engine', 'html');
    app.engine('html', hogan);
    app.get('/', home_route(config, coreStub));
    return app;
  }

  beforeEach(function () {
    sinon.stub(coreStub, 'getPages').returns([]);
    sinon.stub(fsStub, 'existsSync').returns(false);
    getFilePathStub.returns('some/path');
    getLastModifiedStub.returns(moment());
    removeImageDirStub.returns([]);
  });

  afterEach(function () {
    coreStub.getPages.restore();
    fsStub.existsSync.restore();
  });

  it('serves home page', function (done) {
    request(buildApp())
    .get('/')
    .expect(200)
    .end(function (err, res) {
      if (err) {
        done(err);
      } else {
        expect(coreStub.getPages.called).to.be.true;
        done();
      }
    });
  });

  it('serves index.md when present', function (done) {
    fsStub.existsSync.returns(true);
    request(buildApp())
    .get('/')
    .expect(404)  // It's ok that status is 'not found' since test can't find an actual file named 'index.md'
    .end(function (err, res) {
      if (err) {
        done(err);
      } else {
        expect(coreStub.getPages.called).to.be.false;
        done();
      }
    });
  });

  it('removes image content directory', function (done) {
    request(buildApp())
    .get('/')
    .expect(200)
    .end(function (err, res) {
      if (err) {
        done(err);
      } else {
        expect(removeImageDirStub.called).to.be.true;
        done();
      }
    });    
  });

  it('nests pages properly')
  it('filters out pages with show_on_home false');
  it('filters out categories with show_on_home false');
});