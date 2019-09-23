<!-- Build Status -->
<a href="https://travis-ci.org/robertziel/simple_panel_react_client">
  <img src="https://travis-ci.org/robertziel/simple_panel_react_client.svg" alt="Build Status" />
</a>

# SIMPLE PANEL REACT CLIENT

Staging: https://simple-panel-react-client.robertz.co (server based in Poland, app may be asleep and take time to wake up)

RAILS API:
https://github.com/robertziel/simple_panel_rails_backend

Init based on https://www.reactboilerplate.com

Run using npm
```
cd react_client
npm run setup
npm start
```

Sample user:
* email: `hello@robertz.co`
* password: `12345678`

Just sign in implemented. Other authentication features like registrations, password remind, lockable can be quickly added but I omitted them as someone may accidentally block sample account on staging :)

#### API FETCHERS
* I made a simple fetching methods so that only path, body and afterSuccess callback are required to make a request to API anywhere in the project. All necessary settings and errors handling are handled under the hood and kept DRY in one component. Check: `app/containers/BackendApiConnector/fetchers.js`
* **Available fetchers:**
  * `apiGet(options: { component, disableRetry, path, afterSuccess })`
  * `apiPost(options: { component, disableRetry, path, body, afterSuccess })`
* **Options:**
  * component: used to pass processed component
  * disableRetry:
    * always used in forms
    * __false__ as default then if fetching error occurs the processing does not stop and fetch is reported to `connectionRefusedHandler.js` **with** intention of adding to retry queue
    * if set to __true__ the processing stops and fetch is reported to `connectionRefusedHandler.js` **without** intention of adding to retry queue
* **Processing state** - in order to have access to fetching processing status use following rules:
  * define `state.processing` in component
  * you should pass `component: this` to fetcher
  * fetcher will call `component.setStateProcessing()` before and `component.unsetStateProcessing()` after AJAX call changing `state.processing` value between false and true
  * processing state can be used to render spinner, disable submit form etc.
* **Testing:**
  * testing common examples using **_processing state_**:
    * `shouldDisableFormWhileProcessing(formComponentName, methods: { configureWrapper, fillInAndSubmitForm })`
      * Include `import shouldDisableFormWhileProcessing from 'testsHelpers/shouldDisableFormWhileProcessing';` and call in your tests
      * parameters
        * `formComponentName` - component name as css selector, is used to find component in wrapper
        * `spinnerSelector` - spinner name css selector, is used to identify spinner
        * `methods: { configureWrapper }` - function which should call enzyme mock and return wrapper containing tested form component
        * `methods: { fillInAndSubmitForm }` - function which fills in and submit form with valid data


#### AUTHENTICATION
* all authentication related containers are kept in `app/containers/_authPages`
* `app/containers/BackendApiConnector` is responsible for:
  * handling all requests to API
    * API URL is set in `.env` as `BACKEND_API_URL`
  * keeping signed in currentUser data and authenticationToken:
    * User data are not saved in cookies and application asks API to access them each time it initializes before render proper content
    * authenticationToken is saved in cookies
    * when any API request has authentication problem then:
      * authenticationToken is set to null
      * currentUser is set to null
      * when authenticationToken is null SignInPage is rendered ( handled in `app/containers/BackendApiConnector/index.js` )

#### FORMS
It's hard to make forms DRY, but we can adopt some conventions.
Example form can be found in `containers/_authPages/SignInPage/Form.js`
* **Component:**
  * keeps all form params in state and updates them on input's onChange event
  * `onSubmit()` function should be responsible for any actions made after form is submitted, in most cases it will be API fetch [(check section API fetchers)](#api-fetchers)
  * when using API fetcher:
    * Please check [**_API fetchers / Processing_**](#api-fetchers) section
    * pass `disableRetry: true` as config to fetcher so that form will not be submitted without user's knowledge
* **Tests:**
  * Keep tests DRY and use shared examples:
    * `shouldDisableFormWhileProcessing()` - check in [**_API fetchers / Testing_**](#api-fetchers) section

#### Internet connection detection
* Location `containers/InternetConnectionDetector`
* `import { isOnline }` function to get current online/offline boolean value

#### NOTIFICATIONS
* Based on https://github.com/igorprado/react-notification-system
* `notificationSystem` reference can be accessed from `app/containers/NotificationsSystem`
* notification functions should be defined in `notifications.js` files, with following name format `function *Notify()` like `function randomNameNotify()`

#### UI
* CSS based on https://www.styled-components.com/
  * Global style is defined in `app/styles/global-styles.js`
  * Constants with common variables like colors etc. are defined in `app/styles/constants.js`
  * Containers and components have own SCSS defined in `Wrapper.js`
* Basic commonly used elements like container, grid, h1 are defined in `app/components/_ui-elements` folder
  * The elements' components are based on:
    * https://material-ui.com
    * Custom components are defined in `app/components/_ui-elements/*Core` folder like `DivCore`
  * Each element should be accessible in `app/components/_ui-elements/index.js` as `import { Element1, Element2 } from components/_ui-elements` by exporting its styled version
  * Styled version is defined in `app/components/_ui-elements/*.js` file. For example `app/components/_ui-elements/Div.js`
    * Additional style version can be added like:
    ```javascript
      ${({ topLine }) =>
        topLine &&
        css`
          border-top: 4px solid ${colors.main}
        `
      }
    ```
    So that style version (in that case named `topLine`) can be used in element by adding it to props `<Div topLine />`
    * If https://material-ui.com element is styled please use the following convention (https://github.com/styled-components/styled-components/issues/1198#issuecomment-425650423)
    ```javascript
    /* eslint-disable react/jsx-props-no-spreading */
    import React from 'react';
    // then define additional style called here as topLine
    const Button = styled(({ topLine, ...props }) => <ButtonCore {...props} />)`
      // some code
      // then define additional style as mentioned above
      ${({ topLine }) =>
        topLine &&
        css`
          border-top: 4px solid ${colors.main}
        `
      }
    `;
    ```


##### TO DO:
* fix styles, make sure mobile UI is working well
* Add Users page with actions (show, new, edit, delete)
* Implement User roles system
* Add simple Profile page (show, edit)
