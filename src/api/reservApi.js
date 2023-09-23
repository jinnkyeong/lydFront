import api from '@/api'
import store from '@/store/index'



export default {


    getReservs: function(){
        return api({
            method : 'get',
            url :`/reservations`,

        });
    },

    // reservationId -> reservation
    getReservById: function(id){
        return api({
            method : 'get',
            url :`/reservations/${id}`,

        });
    },
        // customerId -> reservation list
    getReservsByCusId: function(cusId){
            return api({
                method : 'get',
                url :`/reservations/cus/${cusId}`,

            });
    },
        // dogwalkerId -> reservation list
    getReservsByDwId: function(DwId){
        return api({
            method : 'get',
            url :`/reservations/dw/${DwId}`,

        });
    },

        // dogwalkerId, status -> reservation list
    getReservsByDwIdAndStatus: function(DwId, status){
        return api({
            method : 'get',
            url :`/reservations/dw/${DwId}/${status}`,

        });
    },

    // customer id, status -> reservation list
    getReservsByCusIdAndStatus: function(cusId, status){
        return api({
            method : 'get',
            url :`/reservations/cus/${cusId}/${status}`,

        });
    },
    getDiariesByCusId: function(cusId){
        return api({
            method : 'get',
            url :`/diaries/cus/${cusId}`,

        });
    },
  
 
}  