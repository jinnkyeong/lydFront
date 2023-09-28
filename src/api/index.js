import axios from 'axios'
import setInterceptors from './interceptors';


function createInstance() {
            // console.log("index : "+ `Bearer ${localStorage.getItem("accessToken")}`)

    const instance = axios.create({
        // baseURL: process.env.VUE_APP_API_BASE_URL // 환경변수로 할라그랬는데 안먹음;;
        // baseURL: "http://13.125.144.0:80",
        baseURL: "http://loveyourdog.co.kr/:80",
        contentType : "application/json; charset=utf-8",
        // console.log("interceptor : "+ `Bearer ${localStorage.getItem("accessToken")}`),
        headers : {
            Authorization : `Bearer ${localStorage.getItem("accessToken")}`}
        });

    return setInterceptors(instance);
}
const instance = createInstance();

export default instance;