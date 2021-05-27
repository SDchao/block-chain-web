module.exports = {
    devServer: {
        disableHostCheck: true,
        proxy: {
            '/devapi': {
                target: "http://localhost:5000/",
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/devapi': ''
                }
            }
        }
    }
}