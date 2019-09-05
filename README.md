<!-- Build Status -->
<a href="https://travis-ci.org/robertziel/simple_panel_react_client">
  <img src="https://travis-ci.org/robertziel/simple_panel_react_client.svg" alt="Build Status" />
</a>

# SIMPLE PANEL REACT CLIENT

RAILS API:
https://github.com/robertziel/simple_panel_rails_backend

Init based on https://www.reactboilerplate.com

Run using npm
```
cd react_client
npm run setup
npm start
```

#### How authentication works?
* all authentication related containers are kept in `app/containers/authPages`
* `app/containers/BackendApiConnector` is responsible for:
  * handling all requests to API
    * API URL is set in `app/containers/BackendApiConnector/constants.js` as `BACKEND_API_URL`
  * keeping signed in currentUser data and authenticationToken:
    * User data are not saved in cookies and application asks API to access them each time it initializes before render proper content
    * authenticationToken is saved in cookies
    * when any API request has authentication problem then:
      * authenticationToken is set to null
      * currentUser is set to null
      * when authenticationToken is null SignInPage is rendered `app/containers/BackendApiConnector/index.js`

#### API fetchers
* I made a simple fetching methods so that only path, body and afterSuccess callback are required to make a request to API anywhere in the project. All necessary settings and errors handling are handled under the hood and kept DRY in one component. Check: `app/containers/BackendApiConnector/fetchers.js`
* Available fetchers:
  * `apiGet(options: { path, afterSuccess })`
  * `apiPost(options: { path, body, afterSuccess })`

#### Notifications
* Based on https://github.com/igorprado/react-notification-system
* `notificationSystem` reference can be accessed from `app/containers/NotificationsSystem`
