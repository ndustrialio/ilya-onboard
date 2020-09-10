import { expect } from 'chai';
import Raven from 'raven-js';
import sinon from 'sinon';
import faker from 'faker';
import ravenService from './ravenService';
import contxtSdk from './contxt';

describe('services/raven', function() {
  beforeEach(function() {
    this.sandbox = sinon.createSandbox();
  });

  afterEach(function() {
    this.sandbox.restore();
  });

  describe('exceptionCaptureInterceptor', function() {
    let expectedError;
    let promise;
    let reportException;

    beforeEach(function() {
      expectedError = new Error(faker.hacker.phrase());
      reportException = this.sandbox.stub(ravenService, 'reportException');
    });

    context("when able to get the users's profile", function() {
      let expectedProfile;
      let getProfile;

      beforeEach(function() {
        expectedProfile = faker.helpers.userCard();

        getProfile = this.sandbox
          .stub(contxtSdk.auth, 'getProfile')
          .resolves(expectedProfile);

        promise = ravenService.exceptionCaptureInterceptor(expectedError);
      });

      it("gets the user's profile", function() {
        return promise.then(expect.fail).catch(() => {
          expect(getProfile).to.be.calledOnce;
        });
      });

      it('reports the exception', function() {
        return promise.then(expect.fail).catch(() => {
          expect(reportException).to.be.calledWith(
            expectedError,
            expectedProfile
          );
        });
      });

      it('throws the original error down the promise chain', function() {
        return expect(promise).to.be.rejectedWith(expectedError);
      });
    });

    context("when unable to get the user's profile", function() {
      beforeEach(function() {
        promise = ravenService.exceptionCaptureInterceptor(expectedError);
      });

      it('reports the exception', function() {
        return promise.then(expect.fail).catch(() => {
          expect(reportException).to.be.calledWith(expectedError);
        });
      });

      it('throws the original error down the promise chain', function() {
        return expect(promise).to.be.rejectedWith(expectedError);
      });
    });
  });

  describe('reportException', function() {
    let captureException;
    let setExtraContext;
    let setUserContext;

    beforeEach(function() {
      captureException = this.sandbox.stub(Raven, 'captureException');
      setExtraContext = this.sandbox.stub(Raven, 'setExtraContext');
      setUserContext = this.sandbox.stub(Raven, 'setUserContext');
    });

    context('when there is an associated profile', function() {
      let profile;

      beforeEach(function() {
        profile = {
          name: faker.name.findName(),
          nickname: faker.name.firstName(),
          sub: faker.internet.password()
        };

        ravenService.reportException(new Error(), profile);
      });

      it('sets the user context', function() {
        expect(setUserContext).to.be.calledWith({ id: profile.sub });
      });

      it('sets the extra context', function() {
        expect(setExtraContext).to.be.calledWith({
          name: profile.name,
          nickname: profile.nickname
        });
      });
    });

    context('when there is no associated profile', function() {
      beforeEach(function() {
        ravenService.reportException(new Error());
      });

      it('does not set the user context', function() {
        expect(setUserContext).to.not.be.called;
      });

      it('does not set the extra context', function() {
        expect(setExtraContext).to.not.be.called;
      });
    });

    context(
      'when the error includes information about the original request',
      function() {
        let initialError;
        let request;

        beforeEach(function() {
          request = {
            headers: {},
            method: 'get',
            params: {
              [faker.hacker.adjective()]: faker.hacker.verb()
            },
            url: faker.internet.url()
          };

          initialError = new Error();
          initialError.request = request;
        });

        context(
          'when the error is from the SDK and includes no response information',
          function() {
            let originalError;

            beforeEach(function() {
              originalError = new Error(faker.hacker.phrase());

              initialError.fromSdk = true;
              initialError.originalError = originalError;

              ravenService.reportException(initialError);
            });

            it('captures the exception and options (with information about the error from the SDK)', function() {
              expect(captureException).to.be.calledWith(request, {
                extra: {
                  fromSdk: true,
                  originalError: originalError
                }
              });
            });
          }
        );

        context(
          'when the error is from the SDK and includes response information',
          function() {
            let originalError;
            let response;

            beforeEach(function() {
              originalError = new Error(faker.hacker.phrase());
              response = {
                data: faker.helpers.createTransaction(),
                config: {
                  params: request.params,
                  url: request.url
                },
                statusText: faker.lorem.words()
              };

              initialError.fromSdk = true;
              initialError.originalError = originalError;
              initialError.response = response;

              ravenService.reportException(initialError);
            });

            it('captures the exception and options (with information about the response and the error from the SDK)', function() {
              expect(captureException).to.be.calledWith(request, {
                extra: {
                  data: response.data,
                  fromSdk: true,
                  originalError: originalError,
                  params: response.config.params,
                  statusText: response.statusText,
                  url: response.config.url
                }
              });
            });
          }
        );

        context(
          'when the error is not from the SDK and includes no response information',
          function() {
            beforeEach(function() {
              ravenService.reportException(initialError);
            });

            it('captures the exception and the base options', function() {
              expect(captureException).to.be.calledWith(request, { extra: {} });
            });
          }
        );

        context(
          'when the error is not from the SDK and includes response information',
          function() {
            let response;

            beforeEach(function() {
              response = {
                data: faker.helpers.createTransaction(),
                config: {
                  params: request.params,
                  url: request.url
                },
                statusText: faker.lorem.words()
              };

              initialError.response = response;

              ravenService.reportException(initialError);
            });

            it('captures the exception and options (with information about the response)', function() {
              expect(captureException).to.be.calledWith(request, {
                extra: {
                  data: response.data,
                  params: response.config.params,
                  statusText: response.statusText,
                  url: response.config.url
                }
              });
            });
          }
        );
      }
    );

    context('when the error includes a message', function() {
      let expectedError;
      let expectedMessage;

      beforeEach(function() {
        expectedMessage = faker.hacker.phrase();
        expectedError = new Error(expectedMessage);

        ravenService.reportException(expectedError);
      });

      it('captures the exception and the base options', function() {
        expect(captureException).to.be.calledWith(expectedMessage, {
          extra: {}
        });
      });
    });

    context(
      'when the error does not have information about the original request and does not include a message',
      function() {
        let expectedError;

        beforeEach(function() {
          expectedError = new Error();

          ravenService.reportException(expectedError);
        });

        it('captures the exception and the base options', function() {
          expect(captureException).to.be.calledWith(expectedError, {
            extra: {}
          });
        });
      }
    );
  });
});
