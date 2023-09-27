import api from '@/api'



export default {


    getFaqsByCate: function(cate){
        return api({
            method : 'get',
            url :`/api/open/faqs/${cate}`,

        });
    },
    
    getCates: function(){
        return api({
            method : 'get',
            url :`/api/open/faqs/cates`,

        });
    },

    
 
  
 
}  