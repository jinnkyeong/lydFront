import api from '@/api'
import store from '@/store/index'



export default {

    verifiy: function(imp_uid){
        return api({
            method : 'post',
            url :`/verifyIamport/${imp_uid}`,
        });
    },
    purchaseSuccess: function(payload){
        return api({
            method : 'post',
            url :`/purchaseSuccess`,
            data  : payload,
        });
    },
} 