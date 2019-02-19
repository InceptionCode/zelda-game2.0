# zelda-game2.0

This application is remake of a previous zelda game that I created here...https://github.com/InceptionCode/zelda-game. The sole purpose here is to remake the zelda-game app all while using react's hooks and potentially react context. This is 100% for learning purposes and to showcase my improvement in overall app architecture and design.

**Reference the old Zelda game file for further information on the game and what inspired the idea. Technology used will be similar, difference here is that the application was created with [create-react-app](https://github.com/facebook/create-react-app), and utilizes react ~16.8 features/changes... i.e. [hooks](https://reactjs.org/docs/hooks-intro.html), and [context API](https://reactjs.org/docs/context.html).**

## Development

Master will have the latest stable release. All development will be on a feature branch ex: feature-xxx. Once tested the branch wil be squashed merged into master. Old files will be anything ending in jsx (xxx.jsx) meaning I have not updated these files based the previous game implementation. Each feature will container small to large portion of migrating old game content to new game content.

## App Structure

- src/ <- where the app lives
  - components/ <- All seprated logic, local state and functionality will be in its own component.
  - images
  - root/ <- The root of the application including the store and provider used to pass state down to all components.
  - sass/ <- All styling
  - services/ <- Helper classes dedicated to one task, or component
  - stores/ <- All reducers/ stores used to hold global state and actions involved for each state.
  - testHelpers/
  - utils/ All helper/utility functions to aid in small task or code manipulation.
  - index.js <- file the renders "root" (provider/app) to the DOM/

(Additional README changes will be made later...)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
