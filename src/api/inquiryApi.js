import api from '@/api'
import store from '@/store/index'



export default {

    // dogwalkerId or customerId -> inquiries

    // getInquiries: function(userId, userType, key){
    //     const info = {
    //         userId :userId,
    //         userType :userType,
    //         key:key

    //     }
    //     return api({
    //         method : 'post',
    //         url :`/open/inquiries/search`,
    //         data:info
    //     });
    // },
    getInquiries: function(page, info, orderStr){
        let information= {};
        if(info){
            information = info
        } 
        information.page = page
        if(orderStr && orderStr.length>0){
            information.orderStr = orderStr
        }
        info.size = 12
        return api({
            method : 'post',
            url :`/api/open/inquiries/search`,
            data: information
        });
    },

    // 문의 생성
    postInquiry: function(datas){
            return api({
                method: 'post',
                url : '/api/inquiries',
                data : datas
            })
        },
    // 문의 수락으로 예약처리
    postReserv: function(inquiryId){
        return api({
            method: 'post',
            url : '/api/reservations',
            data : {
                inquiryId : inquiryId
            }
        })
    },
    
    invalidateInquiry: function(inquiryId,status){
        console.log('zzzzzzzz',inquiryId,'  ',status)
        return api({
            method: 'get',
            url : `/api/inquiries/invalid/${inquiryId}/${status}`,
        })
    },
    


 
} 