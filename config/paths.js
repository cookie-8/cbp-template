'use strict';

const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
    appDirectory: appDirectory,
    appIndex: resolveApp('src/index.tsx'),
    appDist: resolveApp('dist'),
    appStatic: resolveApp('static'),
    appHtml: resolveApp('index.html'),
    appSrc: resolveApp('src'),
    appPackageJson: resolveApp('package.json'),
    appTsConfig: resolveApp('tsconfig.json'),
    yarnLockFile: resolveApp('yarn.lock'),
    appNodeModules: resolveApp('node_modules'),
    appDevPort: 9099
}