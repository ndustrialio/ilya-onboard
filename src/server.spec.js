const ejs = require('ejs');
const path = require('path');
const request = require('supertest');
const clientConfig = require('../config');
const app = require('../src/server');

describe('server/routes', function() {
  beforeEach(function() {
    this.sandbox = sandbox.create();
  });

  afterEach(function() {
    this.sandbox.restore();
  });

  [
    { title: 'responding to a request at the root path', path: '/' },
    { title: 'responding to a request at any other path', path: '/foo/bar' }
  ].forEach(function(testCase) {
    describe(testCase.title, function() {
      let expectedBody;
      let promise;
      let renderFile;

      beforeEach(function() {
        expectedBody = faker.hacker.phrase();
        renderFile = this.sandbox
          .stub(ejs, 'renderFile')
          .callsFake((path, data, opts, cb) => {
            cb(null, expectedBody);
          });

        promise = request(app).get(testCase.path);
      });

      it('renders the index file with the client config options', function() {
        return promise.then(() => {
          expect(renderFile.calledOnce).to.be.true;
          const [filePath, config] = renderFile.firstCall.args;
          expect(filePath).to.equal(
            path.join(__dirname, '..', 'dist', 'src', 'views', 'index.ejs')
          );
          expect(config.htmlWebpackPlugin.options.config).to.equal(
            clientConfig
          );
        });
      });

      it('responds with the rendered file', function() {
        return promise.expect(200, expectedBody);
      });
    });
  });
});
