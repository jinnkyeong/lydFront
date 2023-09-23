import store from '@/store/index'




function setInterceptors(instance) {
    // 요청 보내기 전에 제어할 부분
    instance.interceptors.request.use(
        function(config) {
            // console.log("b")
            // config.headers["Content-Type"] = "application/json; charset=utf-8";
            // console.log("interceptor : "+ `Bearer ${localStorage.getItem("accessToken")}`)
            // config.headers["Authorization"] = `Bearer ${localStorage.getItem("accessToken")}`;
            config.headers["Authorization"] = `Bearer ${store.state.login.accessToken}`;
            return config;
        },
        // 요청 시 에러 처리
        function(error) {
            // console.log("c")
            console.log('requeset error : ',error)
            return Promise.reject(error);
        },
    );
        
    // Add a response interceptor
    // 응답을 받고 then, catch로 처리하기 직전
    instance.interceptors.response.use(
        function(response) {
        // 2xx 범위에 있는 상태 코드는 이 함수를 트리거
        // 응답 데이터가 있는 작업 수행
            return response;
        },
        function(error) {
        // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거
        // 응답 오류가 있는 작업 수행
            console.log('response error : ',error)
            const {
                config, response
                //response: {status}
            } = error;


            if (error.response && error.response.status) {
                switch (error.response.status) {
                // status code가 401인 경우
                case 401:
                    const originalReq = config;
                    // 토큰 만료인 경우 등
                    console.log("401에러를 잡았어용!")
                    if(error.response.data.message==="토큰 기한 만료"){
                        console.log("토큰기한만료인 401에러이다")
                        store.dispatch('doReissue', originalReq)
                    } else if(error.response.data.message==="잘못된 계정정보입니다."){
                        store.commit('failLogin','아이디 또는 비밀번호를 잘못 입력했습니다.입력하신 내용을 다시 확인해주세요.')
                    } 
                    else {
                        console.log("토큰기한만료 아닌 401에러이다")
                    }
                    break;
                case 403:
                    alert('관리자 권한이 필요한 요청입니다.')
                    break;
                default:
                    return Promise.reject(error);
                }
            }
            return Promise.reject(error);            
        },
    );
        
    return instance;
} 

export default setInterceptors;