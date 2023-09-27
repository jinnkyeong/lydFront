import api from '@/api'
import store from '@/store/index'



export default {

    postAppl: function(info){
        
        return api({
            method : 'post',
            url :'/api/applications',
            data : info,

        });
    },
    getAppsByDwId: function(dwId){
        return api({
            method : 'get',
            url :`/api/open/applications/dw/${dwId}`,
        });
    },

    getAppById: function(id){
        return api({
            method : 'get',
            url :`/api/open/applications/${id}`,
        });
    },

    getZipcode: function(){
        return api({
            method : 'get',
            url :`/api/zipcode`,
        });
    },

} 