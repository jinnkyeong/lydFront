import api from '@/api'





export default {

    // 인기도그워커찾기
    getPopluarAppsByCusId: function(cusId){
        return api({
            method : 'get',
            url :`/applications/popular/${cusId}`,
        });
    },
    searchApp: function(page, opts, orderStr){
        let info= {};
        if(opts){
            info = opts
        } 
        info.page = page
        if(orderStr && orderStr.length>0){
            info.orderStr = orderStr
        }
        info.size = 12
        console.log('seachconditions : ',info)
        return api({
            method : 'post',
            url :`/api/open/applications/condition`,
            data : info

        });
    },
  
    getApp: function(appId){
        return api({
            method: 'get',
            url :`/open/applications/${appId}`,
        })
    },
    modifyApp: function(appId,info){
        return api({
            method : 'post',
            url :`/applications/mod/${appId}`,
            data : info, 
            'Content-Type' : "application/json"
        })
    },
    deleteApp: function(dwId){
        return api({
            method : 'get',
            url :`/applications/del/${dwId}`,
            // 'Content-Type' : "application/json"
        })
    },
    getComs: function(){
        return api({
            method : 'get',
            url :'/open/commisions',
        });
    },
    getCom: function(comId){
        return api({
            method : 'get',
            url :`/open/commisions/${comId}`,
        });
    },
    searchCom: function(page, opts, orderStr){
        let info= {};
        if(opts){
            info = opts
        } 
        info.page = page
        if(orderStr && orderStr.length>0){
            info.orderStr = orderStr
        }
        info.size = 12
        console.log('seachconditions : ',info)
        return api({
            method : 'post',
            url :'/open/commisions/condition',
            data : info, 
        });
    },
    modifyCom: function(comId,info){
        const type = info.dogType
        const aggr = info.dogAggr
        const health = info.dogHealth

        switch (type) {
            case '소형견':
                info.dogType = 1
                break;
            case '중형견':
                info.dogType = 2
                break;
            case '대형견':
                info.dogType = 3
                break;
            case '초대형견':
                info.dogType = 4
                break;            
            default:
                break;
        }
        switch (aggr) {
            case '매우 양호':
                info.dogAggr = 1
                break;
            case '약간 양호':
                info.dogAggr = 2
                break;
            case '보통':
                info.dogAggr = 3
                break;
            case '약간 심함':
                info.dogAggr = 4
                break;
            case '매우 심함':
                info.dogAggr = 5
                break;              
            default:
                break;
        }
        switch (health) {
            case '매우 나쁨':
                info.dogHealth = 1
                break;
            case '약간 나쁨':
                info.dogHealth = 2
                break;
            case '보통':
                info.dogHealth = 3
                break;
            case '약간 좋음':
                info.dogHealth = 4
                break;
            case '매우 좋음':
                info.dogHealth = 5
                break;              
            default:
                break;
        }
        return api({
            method : 'post',
            url :`/commisions/mod/${comId}`,
            data : info, 
        })
    },
    deleteCom: function(comId){
        return api({
            method : 'get',
            url :`/commisions/del/${comId}`,
        })
    },
    addAppViewCnt: function(appId){
        return api({
            method : 'get',
            url :`/applications/add/view/${appId}`,
        })
    },
    addComViewCnt: function(comId){
        return api({
            method : 'get',
            url :`/commisions/add/view/${comId}`,
        })
    },
    setAlarmCheck: function(alarmId){
        return api({
            method : 'get',
            url :`/open/alarms/chk/${alarmId}`,
        })
    },

} 