/*
 * @Author: Yokee
 * @Date: 2021-08-10 11:47:10
 * @LastEditTime: 2021-08-10 11:47:23
 * @FilePath: \h5video\vue.config.js
 */
module.exports = {
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    require('postcss-pxtorem')({
                        rootValue: 37.5,
                        propList: ['*'], //决定那些属性自动转化
                        // minPixelValue:2,
                      
                    })
                ]
            }
        }
    },
    configureWebpack: { // webpack 配置
        output: { // 输出重构  打包编译后的 文件名称  【模块名称.版本号.js】
            filename:'js/[name].js',
            chunkFilename:'js/[name].js'
          // chunkFilename: `js/[id].vw.js`
        },
       
      },
    
    lintOnSave: false,
    productionSourceMap: false,
    filenameHashing: false,
    publicPath: './'//统一添加路由前缀
}
