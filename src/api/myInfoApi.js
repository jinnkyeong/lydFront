import api from '@/api'
import store from '@/store/index'
import axios from 'axios';



export default {

    // reservation id -> basic require list
    getBasicRequiresByReservId: function(reservId){
        return api({
            method : 'get',
            url :`/api/basicRequires/${reservId}`,
        });
    },
    // reservation id -> cus require list
    getCusRequiresByReservId: function(reservId){
      return api({
          method : 'get',
          url :`/api/cusRequires/${reservId}`,
      });
     
    },
    // info -> 
    postDiary: function(basicFiles, cusFiles, dto){
        const formdata = new FormData(); 

        // image
        for(let i=0; i< basicFiles.length; i++){
            formdata.append(`imageB`, basicFiles[i]);
        } 
        for(let i=0; i< cusFiles.length; i++){
            formdata.append(`imageC`, cusFiles[i]);
        } 



        // dto
        const json = JSON.stringify(dto);
        const blob = new Blob([json], { type: "application/json" });
        formdata.append(`requestDto`, blob);


        return api({
            method : 'post',
            url : `/api/diaries`,
            data : formdata, 
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        
    },
    // reservation id, info -> 수정
    postModify: function(reservId, info){
        return api({
            method : 'post',
            url :`/api/reservations/mod/${reservId}`,
            data  : info,
        });
    },

    // customer id -> profile
    getProfileByCusId:function(cusId){
        return api({
            method : 'get',
            url :`/api/customers/${cusId}`,
        });
    },
    // dogwalker id -> profile
    getProfileByDwId:function(dwId){
        return api({
            method : 'get',
            url :`/api/dogwalkers/${dwId}`,
        });
    },

    // info -> profile 생성
    postModifyProfile:function(fileArray, info){
        const formdata = new FormData(); 
        // image
        for(let i=0; i<fileArray.length; i++){
            formdata.append(`image`, fileArray[i]);
        } 
        // dto        
        const json = JSON.stringify(info);
        const blob = new Blob([json], { type: "application/json" });
        formdata.append(`requestDto`, blob);
        formdata.append(`requestDto`, blob);
        return api({
            method : 'post',
            url :`/api/profile`,
            data : formdata,
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
    },

    // customer id -> inquiry list
    getInquriesByCusId:function(cusId){
        return api({
            method : 'get',
            url :`/api/inquiries/${cusId}/customer`,
        });
    },

    // dogwalker id -> lecture list
    getLectures:function(dwId){
        return api({
            method: 'get',
            url: `/api/open/lectures/dw/${dwId}`
        })
    },
    getTest:function(dwId){
        return api({
            method: 'get',
            url: `/api/tests/${dwId}`
        })
    },
    getQuestionTypes:function(){
        return api({
            method: 'get',
            url: `/api/questionTypes`
        })
    },

    postTest: function(dwId,testStartAt,testEndAt,inputs){
        return api({
            method : 'post',
            url :`/api/questionTypes/${dwId}/${testStartAt}/${testEndAt}`,
            data  : inputs,
        });
    },
    

    postLecture: function(info){
        return api({
            method : 'post',
            url :`/api/open/lectures`,
            data  : info,
        });
    },

    // 비밀번호 변경
    checkPwd: function(info){
        return api({
            method : 'post',
            url :`/api/pwd/mod/chk`,
            data  : info,
        });
    },
    changePwd: function(info){
        return api({
            method : 'post',
            url :`/api/pwd/mod/mod`,
            data  : info,
        });
    },
    getCode: function(info){
        return api({
            method : 'post',
            url :`/api/sms/send`,
            data  : info,
        });
    },
    changePhone: function(info){
        return api({
            method : 'post',
            url :`/api/phone/mod`,
            data  : info,
        });
    },

 

 
} 