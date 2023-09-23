import api from '@/api'
import store from '@/store/index'



export default {

    // getAppsByDwId: function(dwId){
    //     return api({
    //         method : 'get',
    //         url :`/open/applications/dw/${dwId}`,
    //     });
    // },
    getDogwalkers: function(){
        return api({
            method : 'get',
            url :`/open/dogwalkers`,
        });
    },
    passDogwalker: function(dwId,passed){
        return api({
            method : 'get',
            url :`/admin/dogwalkers/${dwId}/${passed}`,
        });
    },
    passApplDogwalker: function(dwId,passed){
        return api({
            method : 'get',
            url :`/admin/dogwalkers/appl/${dwId}/${passed}`,
        });
    },
    passItvDogwalker: function(dwId,passed){
        return api({
            method : 'get',
            url :`/admin/dogwalkers/itv/${dwId}/${passed}`,
        });
    },

    startCalculate: function(reservId){
        return api({
            method : 'get',
            url :`/admin/reservations/cal/start/${reservId}`,
        });
    },
    endCalculate: function(reservId){
        return api({
            method : 'get',
            url :`/admin/reservations/cal/end/${reservId}`,
        });
    },
} 