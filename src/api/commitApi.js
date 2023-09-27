import api from '@/api'
import store from '@/store/index'



export default {


    postCms: function(info){
        return api({
            method : 'post',
            url :'/api/commisions',
            data : info,

        });
    },
    // customerId -> commision list
    getCmsByCusId: function(cusId){
        return api({
            method : 'get',
            url :`/api/open/commisions/cus/${cusId}`,

        });
    },
    // commisionId -> commision
    getCmById: function(id){
        return api({
            method : 'get',
            url :`/api/open/commisions/${id}`,

        });
    },

    
 
} 