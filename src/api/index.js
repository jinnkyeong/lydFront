import axios from 'axios'
import setInterceptors from './interceptors';


function createInstance() {

    const instance = axios.create({
        baseURL: "http://loveyourdog.co.kr:80",
        // baseURL: "https://loveyourdog.co.kr",
        // baseURL: "http://localhost:8090",
        contentType : "application/json; charset=utf-8",
        headers : {
            Authorization : `Bearer ${localStorage.getItem("accessToken")}`}
        });

    return setInterceptors(instance);
}
const instance = createInstance();

export default instance;