import axios from "axios";
import api from '@/api'
import store from '@/store/index'




export default {

    postRegister: function(email,pwd,userType){
        // const formdata = new FormData(); // form data 갑자기 안먹어서 json으로 변경

        console.log(email, ' ', pwd )

        return api({
            method : 'post',
            url :'/api/register',
            data : {
                'email': email,
                'pwd' : pwd,
                'accountType' : 'EMAIL',
                'userType' : userType
            }, 

        });
    },

    postFindPwd: function(email,userType){
        // const formdata = new FormData(); 
        // formdata.append('email', email);    
        // formdata.append('userType', store.state.userType);   

        // console.log(store.state.userType)
        return api({
            method : 'post',
            url : `/api/open/send-mail/pwd`,
            data : {
                email : email,
                userType: userType
            },

        });
    },
    postEmail: function(email){ 
        return api({
            method : 'post',
            url : `/api/open/send-mail/email`,
            data : {
                email: email
            },
        });
    },

    checkDuplEmail: function(email,userType){
        return api({
            method : 'post',
            url : `/api/auth/checkDuplEmail`,
            data : {
                email : email,
                userType: userType
            },
        })
    },
    kakaologin: function(){
        return api({
            method : 'get',
            url : `/api/login/kakao`,
        })
    },
    
 
 
} 