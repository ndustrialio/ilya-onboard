import React from 'react';
import Routes from './Routes';

describe('routes/Routes', function() {
  let baseProps;

  beforeEach(function() {
    this.sandbox = sandbox.create();

    baseProps = {
      auth: {
        getProfile: this.sandbox.stub().resolves({}),
        isAuthenticated: this.sandbox.stub(),
        logOut: this.sandbox.stub()
      }
    };
  });

  afterEach(function() {
    this.sandbox.restore();
  });

  describe('constructor', function() {
    let routes;

    beforeEach(function() {
      routes = shallow(<Routes {...baseProps} />);
      console.log('The routes are: ', routes.instance().auth.logout.name);
    });

    it('binds a copy of logout to the instance', function() {
      expect(routes.instance().auth.logout.name).to.equal('bound logOut');
    });

    it("sets an initial empty profile to the component's state", function() {
      expect(routes.state('profile')).deep.to.equal({});
    });
  });

  describe('componentDidMount', function() {
    context('when the user is authenticated', function() {
      let expectedState;
      let routes;
      let promise;
      let props;

      beforeEach(function() {
        expectedState = {
          profile: {
            profileImage: faker.image.avatar(),
            userName: faker.name.firstName()
          }
        };

        props = {
          ...baseProps,
          auth: {
            ...baseProps.auth,
            getProfile: this.sandbox.stub().resolves({
              nickname: expectedState.profile.userName,
              picture: expectedState.profile.profileImage
            }),
            isAuthenticated: this.sandbox.stub().returns(true)
          }
        };

        routes = shallow(<Routes {...props} />, {
          disableLifecycleMethods: true
        });

        promise = routes.instance().componentDidMount();
      });

      it('checks if the user is authenticated', function() {
        expect(props.auth.isAuthenticated.calledOnce).to.be.true;
      });

      it("gets the user's profile", function() {
        expect(props.auth.getProfile.called).to.be.true;
      });

      it("sets the user's profile information to the component's state", function() {
        return promise.then(() => {
          expect(routes.state()).to.deep.equal(expectedState);
        });
      });
    });

    context('when the user is not authenticated', function() {
      let props;

      beforeEach(function() {
        props = {
          ...baseProps,
          auth: {
            ...baseProps.auth,
            isAuthenticated: this.sandbox.stub().returns(false)
          }
        };

        const routes = shallow(<Routes {...props} />, {
          disableLifecycleMethods: true
        });
        routes.instance().componentDidMount();
      });

      it("does not get the user's profile", function() {
        expect(props.auth.getProfile.called).to.be.false;
      });
    });
  });

  describe('logOut', function() {
    beforeEach(function() {
      const routes = shallow(<Routes {...baseProps} />);
      routes.instance().logOut();
    });

    it('starts the log out process', function() {
      expect(baseProps.auth.logOut.calledOnce).to.be.true;
    });
  });
});
