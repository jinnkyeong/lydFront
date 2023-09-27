import api from '@/api'
import store from '@/store/index'



export default {


    getReservs: function(){
        return api({
            method : 'get',
            url :`/api/reservations`,

        });
    },

    // reservationId -> reservation
    getReservById: function(id){
        return api({
            method : 'get',
            url :`/api/reservations/${id}`,

        });
    },
        // customerId -> reservation list
    getReservsByCusId: function(cusId){
            return api({
                method : 'get',
                url :`/api/reservations/cus/${cusId}`,

            });
    },
        // dogwalkerId -> reservation list
    getReservsByDwId: function(DwId){
        return api({
            method : 'get',
            url :`/api/reservations/dw/${DwId}`,

        });
    },

        // dogwalkerId, status -> reservation list
    getReservsByDwIdAndStatus: function(DwId, status){
        return api({
            method : 'get',
            url :`/api/reservations/dw/${DwId}/${status}`,

        });
    },

    // customer id, status -> reservation list
    getReservsByCusIdAndStatus: function(cusId, status){
        return api({
            method : 'get',
            url :`/api/reservations/cus/${cusId}/${status}`,

        });
    },
    getDiariesByCusId: function(cusId){
        return api({
            method : 'get',
            url :`/api/diaries/cus/${cusId}`,

        });
    },
  
 
}  