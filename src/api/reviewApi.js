import api from '@/api'
import store from '@/store/index'



export default {

    getDogwalkers: function(){
        return api({
            method : 'get',
            url :`/api/admin/dogwalkers`,
        });
    },


    postReview: function(fileArray, info){
        const formdata = new FormData(); 
        // image
        for(let i=0; i<fileArray.length; i++){
            formdata.append(`image`, fileArray[i]);
        } 
        // dto        
        const json = JSON.stringify(info);
        const blob = new Blob([json], { type: "application/json" });
        formdata.append(`requestDto`, blob);
        return api({
            method : 'post',
            url :`/api/reviews`,
            data : formdata,
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },

    getReviewsByDwId: function(dwId){
        return api({
            method : 'get',
            url :`/api/open/reviews/dw/${dwId}`,
        });
    },

    getCommentsByReviewId : function(reviewId){
        return api({
            method : 'get',
            url :`/api/open/comments/${reviewId}`,
        });
    },
    getCommentsByReviewIdAndParentId: function(reviewId, parentId){
        return api({
            method : 'get',
            url :`/api/open/comments/${reviewId}/${parentId}`,
        });
    },
    postComment: function(info){
       
        return api({
            method : 'post',
            url :`/api/open/comments`,
            data : info,
         
        });
    },
    getCommentsByParentIdAndReviewId: function(parentId,reviewId){
        return api({
            method : 'get',
            url :`/api/open/childComments/${parentId}/${reviewId}`,
        });
    },
    

} 