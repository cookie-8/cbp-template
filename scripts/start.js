const webpack = require('webpack')
const chalk = require('chalk')
const express = require('express')
const https = require('https')
const path = require('path')
const fs = require('fs')
const webpackDevMiddleware = require('webpack-dev-middleware')
const httpProxyMiddleware = require('http-proxy-middleware')
const pathConfig = require('../config/paths')
const proxy = require('../config/proxy')
const webpackConfig = require('../webpack/webpack.dev')
const history = require('connect-history-api-fallback')
const { getIP } = require('../config/utils')
const privateKey = fs.readFileSync(path.join(__dirname, './certificate/private.pem'), 'utf8')
const certificate = fs.readFileSync(path.join(__dirname, './certificate/file.crt'), 'utf8')
const credentials = { key: privateKey, cert: certificate }

const app = express()

const compiler = webpack(webpackConfig)

proxy.length > 0 &&
    proxy.forEach(value => {
        app.use(
            value.api,
            httpProxyMiddleware({
                target: value.target,
                changeOrigin: true,
            }),
        )
    })

app.use('/', history());


app.use(
    webpackDevMiddleware(compiler, {
        publicPath: webpackConfig.output.publicPath,
    }),
)
app.use('/static', express.static(pathConfig.appStatic))

const httpsServer = https.createServer(credentials,app)
// https服务
httpsServer.listen(pathConfig.appDevPort, () => {
    console.log(chalk.green('\nnow start a dev sever..... '))
    console.log(chalk.green(`App listening to https://${getIP()}:${pathConfig.appDevPort}\n`))
})
