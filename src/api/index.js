import axios from 'axios'
import setInterceptors from './interceptors';


function createInstance() {

    const instance = axios.create({
        baseURL: "https://loveyourdog.co.kr",
        contentType : "application/json; charset=utf-8",
        headers : {
            Authorization : `Bearer ${localStorage.getItem("accessToken")}`}
        });

    return setInterceptors(instance);
}
const instance = createInstance();

export default instance;