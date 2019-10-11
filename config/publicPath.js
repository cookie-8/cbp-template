'use strict'
const pathConfig = require('./paths')
const fs = require('fs')

const file = fs.readFileSync(pathConfig.appPackageJson).toString(),
    projectName = JSON.parse(file).name

module.exports = {
    dev: `//static2.test.ximalaya.com/yx/${projectName}/last/dist/`,
    prod: `//s1.xmcdn.com/yx/${projectName}/last/dist/`,
    uat: `//s1.uat.xmcdn.com/yx/${projectName}/last/dist/`,
}
