'use strict';

const path = require('path');
const fs = require('fs');
const getPublicUrlOrPath = require('react-dev-utils/getPublicUrlOrPath');

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebook/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

// We use `PUBLIC_URL` environment variable or "homepage" field to infer
// "public path" at which the app is served.
// webpack needs to know it to put the right <script> hrefs into HTML even in
// single-page apps that may serve index.html for nested URLs like /todos/42.
// We can't use a relative path in HTML because we don't want to load something
// like /todos/42/static/js/bundle.7289d.js. We have to know the root.
const publicUrlOrPath = getPublicUrlOrPath(
  process.env.NODE_ENV === 'development',
  require(resolveApp('package.json')).homepage,
  process.env.PUBLIC_URL
);

const buildPath = process.env.BUILD_PATH || 'build';

const moduleFileExtensions = [
  'web.mjs',
  'mjs',
  'web.js',
  'js',
  'web.ts',
  'ts',
  'web.tsx',
  'tsx',
  'json',
  'web.jsx',
  'jsx',
];

// Resolve file paths in the same order as webpack
const resolveModule = (resolveFn, filePath) => {
  const extension = moduleFileExtensions.find(extension =>
    fs.existsSync(resolveFn(`${filePath}.${extension}`))
  );

  if (extension) {
    return resolveFn(`${filePath}.${extension}`);
  }

  return resolveFn(`${filePath}.js`);
};

// config after eject: we're in ./config/
module.exports = {
  dotenv: resolveApp('.env'),
  appPath: resolveApp('.'),
  appBuild: resolveApp(buildPath),
  appPublic: resolveApp('public'),
  appHtml: resolveApp('public/index.html'),
  appIndexJs: resolveModule(resolveApp, 'src/index'),
  appLoginHtml: resolveApp('public/login.html'),
  appLoginJs: resolveModule(resolveApp, 'src/Login'),
  appRegisterHtml: resolveApp('public/register.html'),
  appRegisterJs: resolveModule(resolveApp, 'src/Register'),
  appFriendsHtml: resolveApp('public/friends.html'),
  appFriendsJs: resolveModule(resolveApp, 'src/Friends'),
  appUserProfileHtml: resolveApp('public/userprofile.html'),
  appUserProfileJs: resolveModule(resolveApp, 'src/components/UserProfile/UserProfile'),
  appMarketHtml: resolveApp('public/market.html'),
  appMarketJs: resolveModule(resolveApp, 'src/components/Market/Market'),
  appCourseHtml: resolveApp('public/course.html'),
  appCourseJs: resolveModule(resolveApp, 'src/components/Course/Course'),
  appCommentHtml: resolveApp('public/comment.html'),
  appCommentJs: resolveModule(resolveApp, 'src/components/Comment/Comment'),
  appSettingHtml: resolveApp('public/setting.html'),
  appSettingJs: resolveModule(resolveApp, 'src/components/Setting/Setting'),
  appSearchHtml: resolveApp('public/search.html'),
  appSearchJs: resolveModule(resolveApp, 'src/Search'),
  appFavoriteHtml: resolveApp('public/favorite.html'),
  appFavoriteJs: resolveModule(resolveApp, 'src/components/Favorite/Favorite'),
  appHistoryHtml: resolveApp('public/history.html'),
  appHistoryJs: resolveModule(resolveApp, 'src/components/History/History'),
  appDynamicHtml: resolveApp('public/dynamic.html'),
  appDynamicJs: resolveModule(resolveApp, 'src/Dynamic'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  appTsConfig: resolveApp('tsconfig.json'),
  appJsConfig: resolveApp('jsconfig.json'),
  yarnLockFile: resolveApp('yarn.lock'),
  testsSetup: resolveModule(resolveApp, 'src/setupTests'),
  proxySetup: resolveApp('src/setupProxy.js'),
  appNodeModules: resolveApp('node_modules'),
  appWebpackCache: resolveApp('node_modules/.cache'),
  appTsBuildInfoFile: resolveApp('node_modules/.cache/tsconfig.tsbuildinfo'),
  swSrc: resolveModule(resolveApp, 'src/service-worker'),
  publicUrlOrPath,
};



module.exports.moduleFileExtensions = moduleFileExtensions;
