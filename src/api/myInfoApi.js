import api from '@/api'
import store from '@/store/index'
import axios from 'axios';



export default {

    // reservation id -> basic require list
    getBasicRequiresByReservId: function(reservId){
        return api({
            method : 'get',
            url :`/basicRequires/${reservId}`,
        });
    },
    // reservation id -> cus require list
    getCusRequiresByReservId: function(reservId){
      return api({
          method : 'get',
          url :`/cusRequires/${reservId}`,
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
            url : `/diaries`,
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
            url :`/reservations/mod/${reservId}`,
            data  : info,
        });
    },

    // customer id -> profile
    getProfileByCusId:function(cusId){
        return api({
            method : 'get',
            url :`/customers/${cusId}`,
        });
    },
    // dogwalker id -> profile
    getProfileByDwId:function(dwId){
        return api({
            method : 'get',
            url :`/dogwalkers/${dwId}`,
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
            url :`/profile`,
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
            url :`/inquiries/${cusId}/customer`,
        });
    },

    // dogwalker id -> lecture list
    getLectures:function(dwId){
        return api({
            method: 'get',
            url: `/open/lectures/dw/${dwId}`
        })
    },
    getTest:function(dwId){
        return api({
            method: 'get',
            url: `/tests/${dwId}`
        })
    },
    getQuestionTypes:function(){
        return api({
            method: 'get',
            url: `/questionTypes`
        })
    },

    postTest: function(dwId,testStartAt,testEndAt,inputs){
        return api({
            method : 'post',
            url :`/questionTypes/${dwId}/${testStartAt}/${testEndAt}`,
            data  : inputs,
        });
    },
    

    postLecture: function(info){
        return api({
            method : 'post',
            url :`/open/lectures`,
            data  : info,
        });
    },

    // 비밀번호 변경
    checkPwd: function(info){
        return api({
            method : 'post',
            url :`/pwd/mod/chk`,
            data  : info,
        });
    },
    changePwd: function(info){
        return api({
            method : 'post',
            url :`/pwd/mod/mod`,
            data  : info,
        });
    },
    getCode: function(info){
        return api({
            method : 'post',
            url :`/sms/send`,
            data  : info,
        });
    },
    changePhone: function(info){
        return api({
            method : 'post',
            url :`/phone/mod`,
            data  : info,
        });
    },

 

 
} 