// 다시 run server 해야 적용됨(자동로딩X)


const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  // ESLint should always be multi-word-component 에러
  lintOnSave:false, 

  // vuetify
  pluginOptions: {
    vuetify: {
			// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
		}
  },

  // npm run build 타겟 디렉토리 (백엔드쪽!)
  // outputDir: "../../../backend/new/brokingservice/brokingservice/src/main/resources/static",
  // outputDir: "../brokingservice/brokingservice/src/main/resources/static",

  // indexPath: "../static/index.html",
  // indexPath: "../../backend/new/brokingservice/brokingservice/src/main/resources/static/index.html",

  // npm run server 개발 진행시 포트가 다르기 때문에 프록시 설정해줘야 함
  // target : 백엔드 url(port 포함)가 들어감
  // changeOrigin -> true로 해야 cors 문제 해결할 수 있음
  devServer: {
  //   proxy: {
  //     '/open':{
  //       'target' : "http://localhost:8090",
  //       "pathRewrite":{'^/':''},
  //       "changeOrigin":true,
        
  //     }
  //     // {
  //       //   '/api': {
  //         //     target: "http://localhost:8090",
  //         //     // changeOrigin: true,
  //         //     // ws: false, // 웹서버 false?
  //         //   }
  //         // },
  // },
    historyApiFallback: true,
  }
})
