module.exports = {
    devServer: {
        disableHostCheck: true,
        proxy: {
            '/api': {
                target: "http://192.168.1.20:3000",
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/apis': ''
                }
            }
        }
    }
}