import api from '@/api'
import store from '@/store/index'



export default {

    postAppl: function(info){
        
        return api({
            method : 'post',
            url :'/applications',
            data : info,

        });
    },
    getAppsByDwId: function(dwId){
        return api({
            method : 'get',
            url :`/open/applications/dw/${dwId}`,
        });
    },

    getAppById: function(id){
        return api({
            method : 'get',
            url :`/open/applications/${id}`,
        });
    },

    getZipcode: function(){
        return api({
            method : 'get',
            url :`/zipcode`,
        });
    },

} 