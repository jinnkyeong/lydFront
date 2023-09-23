import api from '@/api'
import store from '@/store/index'



export default {

    // dogwalkerId or customerId -> inquiries
    getOffers: function(userId, userType, key){
        return api({
            method : 'get',
            url :`offers/${userId}/${userType}/${key}`,
        });
    },

    // 제안 생성
    postOffer: function(datas,status){
        datas.status = status // 1 or 4
            return api({
                method: 'post',
                url : '/offers',
                data : datas
            })
        },
  // 제안 수락으로 예약처리
  postReserv: function(offerId){
    return api({
        method: 'post',
        url : 'reservations',
        data : {
            offerId : offerId
        }
    })
},
     // 제안 거절으로 상태변경
     // 0: 취소
     // 3: 거절
     invalidateOffer: function(offerId, status){
        return api({
            method: 'get',
            url : `/offers/invalid/${offerId}/${status}`,
        })
    },
 
 


 
} 