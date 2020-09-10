[![wercker status](https://app.wercker.com/status/62bdcab19752a40413c8fb0a3a50b10e/s/master "wercker status")](https://app.wercker.com/project/byKey/62bdcab19752a40413c8fb0a3a50b10e)

# react-starter

A boilerplate React/Node/Webpack app for ndustrial.io

# Getting Started

## 1. NPM Login

You will need to login to NPM to install from the private NPM repository. Gather your NPM auth token from `~/.npmrc` after logging in through the CLI and save it to your `~/.profile` file as shown below.

```
export NPM_TOKEN="00000000-0000-0000-0000-000000000000"
```

When your `~/.profile` is set up, refresh your environment variables by using `source ~/.profile`.

[Source](http://blog.npmjs.org/post/118393368555/deploying-with-npm-private-modules)

## 2. Initial configuration setup

This boilerplate project contains a `config` folder, with configuration files for various environments, e.g. `staging`, `development`, `production`. The configuration for Auth0 _must_ be set in the configuration files before you can run the application for the first time. If you _do not_ have the need to have different configurations for different environments, you can move the `auth0` definitions to the `all.js` file and remove this configuration from the individual environments.

## 3. Running the application

Run `npm start` and view the app at `http://localhost:5000`.

## 4. Exposing environment-specific configuration variables to the front-end.

You can expose any arbitrary environment-specific variables to front-end by leveraging the javascript files in the `config` folder. Everything defined in these configurations will be exposed on a `window.nd` object in your front-end.

#### **IMPORTANT NOTE**: ALL of these values get injected into the HTML of the page. Do not put any values that should not be exposed to the front-end (such as client secrets).

### Example: Adding a `mapbox` accessToken for different environments

Let's say you want to use a different `mapbox` accessToken for `production` than for other environments. To accomplish this:

Add an accessToken to `config/env/all.js`:

```
// This is the config/env/all.js file
module.exports = {
  mapboxAccessToken: 'some_token'
};
```

Add an accessToken to `config/env/production.js`:

```
// This is the config/env/production.js file
module.exports = {
  mapboxAccessToken: 'some_production_token'
};
```

Now, you can do something fancy with `window.nd.mapboxAccessToken` somewhere in your front-end code.
